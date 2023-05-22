import { DisasterDtoType, DisasterType, formatCommonFields } from '@wfp-dmp/interfaces';
import { get, startCase } from 'lodash';

// TODO - avoid duplication of translated data
import Mapping from './mapping.json';
// Refactor not to use ALLOWED_HOST
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
  const text = `ទិន្នន័យបឋមបានរាយការណ៍ _${commonFields.entryName}_
    ${get(Mapping, ['province', commonFields.province]) as string}
    ${get(Mapping, ['district', commonFields.district]) as string}
    ${get(Mapping, ['commune', commonFields.commune]) as string}
  
    __${get(Mapping, ['disasters', commonFields.disTyp], startCase(disasterType)) as string}__ 
    កាលបរិច្ឆេទ គ្រោះមហន្តរាយ: ${commonFields.disasterDate}
    កាលបរិច្ឆេទ បញ្ចូលរបាយការណ៍: ${commonFields.entryDate}
  
    ចំនួនសរុប: ${getKeyMatchValue(form, metricsMapping.affected)}
    ចំនួនស្លាប់: ${getKeyMatchValue(form, metricsMapping.dead)}
    ចំនួនអ្នកកករសរុប: ${getKeyMatchValue(form, metricsMapping.injured)}
    ទីកន្លែងផ្សព្វផ្សាយ: ${getKeyMatchValue(form, metricsMapping.houses)}
  
    
    DCDM បានបញ្ជូនទិន្នន័យថ្មីនៅក្នុងប្រព័ន្ធ។ សូមពិនិត្យ និងអនុម័ត. សូមអរគុណ !
    [ភ្ជាប់ទៅគេហទំព័រ](${new URL(commonFields.approvalLink, frontendUrl).toString()})`;

  return text;
};
