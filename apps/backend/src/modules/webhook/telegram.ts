import { DisasterDtoType, DisasterType, formatCommonFields } from '@wfp-dmp/interfaces';
import { get, startCase } from 'lodash';

// TODO - avoid duplication of translated data
import Mapping from './mapping.json';
// Refactor not to use ALLOWED_HOST once deployed
const frontendUrl = process.env.ALLOWED_HOST;

// TODO - confirm fields with Roth.
const metricsMapping = {
  affected: ['NumPeoAff'],
  dead: ['TNumDeath', 'NumDeathTo'],
  injured: ['NumTInjure', 'ToNumInjure'],
  houses: ['NumHouAff', 'BuildingAff', 'NumFamAff'],
};

const getKeyMatchValue = (form: DisasterDtoType, matches: string[]): number => {
  let returnValue = 0;
  Object.entries(form).forEach(([key, value]) => {
    matches.forEach((match) => {
      if (key.includes(match)) {
        console.log(value);
        returnValue = value as number;

        return;
      }
    });
    if (returnValue !== 0) {
      return;
    }
  });

  return returnValue;
};

export const generateTelegramMessage = (disasterType: DisasterType, form: DisasterDtoType) => {
  if (frontendUrl === undefined) {
    throw new Error('frontendUrl is not defined');
  }

  const commonFields = formatCommonFields(form);
  
  // Get metric values
  const affectedCount = getKeyMatchValue(form, metricsMapping.affected);
  const deadCount = getKeyMatchValue(form, metricsMapping.dead);
  const injuredCount = getKeyMatchValue(form, metricsMapping.injured);
  const housesCount = getKeyMatchValue(form, metricsMapping.houses);
  
  // Format location
  const province = get(Mapping, ['province', commonFields.province]) as string;
  const district = get(Mapping, ['district', commonFields.district]) as string;
  const commune = get(Mapping, ['commune', commonFields.commune]) as string;
  const location = `${province}, ${district}, ${commune}`;
  
  // Format disaster type
  const disasterName = get(Mapping, ['disasters', commonFields.disTyp], startCase(disasterType)) as string;
  
  // Build message with conditional sections
  let text = `${location}\n\n__${disasterName}__\nកាលបរិច្ឆេទ គ្រោះមហន្តរាយ: ${commonFields.disasterDate}\nកាលបរិច្ឆេទ បញ្ចូលរបាយការណ៍: ${commonFields.entryDate}\n`;
  
  // Only add metrics that have values
  if (affectedCount > 0) {
    text += `\nចំនួនសរុប: ${affectedCount}`;
  }
  
  if (deadCount > 0) {
    text += `\nចំនួនស្លាប់: ${deadCount}`;
  }
  
  if (injuredCount > 0) {
    text += `\nចំនួនអ្នកកករសរុប: ${injuredCount}`;
  }
  
  if (housesCount > 0) {
    text += `\nទីកន្លែងផ្សព្វផ្សាយ: ${housesCount}`;
  }
  
  // Add footer information with new district notification format
  text += `\n\n${district}បានបញ្ជូនទិន្នន័យទៅក្នុងប្រព័ន្ធរួចហើយ`;
  text += `\nសូមចូលពិនិត្យ និងឯកភាព។ សូមអរគុណ`;
  text += `\n[ភ្ជាប់ទៅគេហទំព័រ](${new URL(commonFields.approvalLink, frontendUrl).toString()})`;

  return text;
};
