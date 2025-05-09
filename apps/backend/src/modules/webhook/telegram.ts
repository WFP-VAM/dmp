import {
  DisasterDtoType,
  DisasterType,
  formatCommonFields,
  FLOOD,
  DROUGHT,
  FloodSpecific,
  IncidentSpecific,
  DroughtSpecific,
  floodSpecificKeys,
  droughtSpecificKeys,
  incidentSpecificKeys,
} from '@wfp-dmp/interfaces';
import { get, startCase } from 'lodash';
// TODO - avoid duplication of translated data
import Mapping from './mapping.json';
// Refactor not to use ALLOWED_HOST once deployed
const frontendUrl = process.env.ALLOWED_HOST;

/**
 * Maps form data to enum values based on disaster type
 * @param form The disaster data
 * @param disasterType The type of disaster
 * @returns Record of enum keys to values
 */
const formatFormValues = (form: DisasterDtoType, disasterType: DisasterType): Record<string, number> => {
  const values: Record<string, number> = {};
  
  // Extract values based on the disaster type
  if (disasterType === FLOOD) {
    for (const [enumKey, formKey] of Object.entries(floodSpecificKeys)) {
      const rawValue = form[formKey as keyof typeof form];
      const numValue = typeof rawValue === 'string' ? parseFloat(rawValue) : rawValue;
      
      if (!isNaN(Number(numValue)) && Number(numValue) > 0) {
        values[enumKey] = Number(numValue);
      } else {
        values[enumKey] = 0;
      }
    }
  } else if (disasterType === DROUGHT) {
    for (const [enumKey, formKey] of Object.entries(droughtSpecificKeys)) {
      const rawValue = form[formKey as keyof typeof form];
      const numValue = typeof rawValue === 'string' ? parseFloat(rawValue) : rawValue;
      
      if (!isNaN(Number(numValue)) && Number(numValue) > 0) {
        values[enumKey] = Number(numValue);
      } else {
        values[enumKey] = 0;
      }
    }
  } else {
    // INCIDENT
    for (const [enumKey, formKey] of Object.entries(incidentSpecificKeys)) {
      const rawValue = form[formKey as keyof typeof form];
      const numValue = typeof rawValue === 'string' ? parseFloat(rawValue) : rawValue;
      
      if (!isNaN(Number(numValue)) && Number(numValue) > 0) {
        values[enumKey] = Number(numValue);
      } else {
        values[enumKey] = 0;
      }
    }
  }
  
  return values;
};

// Structure for message section templates
interface MessageSection {
  format: (values: Record<string, number>) => string;
  condition?: (values: Record<string, number>) => boolean;
}

export const generateTelegramMessage = (disasterType: DisasterType, form: DisasterDtoType) => {
  if (frontendUrl === undefined) {
    throw new Error('frontendUrl is not defined');
  }

  const commonFields = formatCommonFields(form);
  
  // Format location
  const province = get(Mapping, ['province', commonFields.province]) as string;
  const district = get(Mapping, ['district', commonFields.district]) as string;
  const commune = get(Mapping, ['commune', commonFields.commune]) as string;
  const location = `${province}, ${district}, ${commune}`;
  
  // Format disaster type
  const disasterName = get(Mapping, ['disasters', commonFields.disTyp], startCase(disasterType)) as string;
  
  // Build message with header
  let text = `${location}\n`;
  text += `- មានករណី${disasterName}: ថ្ងៃកើតហេតុ ${commonFields.disasterDate}\n`;
  text += `- ថ្ងៃបញ្ចូលរបាយការណ៍: ${commonFields.entryDate}\n`;
  
  // Get the formatted values based on disaster type
  const values = formatFormValues(form, disasterType);
  
  // Shared message sections for all disaster types
  const commonSections: MessageSection[] = [
    {
      format: (v) => `- ប៉ះពាល់: ${v[FloodSpecific.NumFamAff]} គ្រួសារ និងមនុស្ស  ${v[FloodSpecific.NumPeoAff]} នាក់`,
      condition: (v) => v[FloodSpecific.NumFamAff] > 0 || v[FloodSpecific.NumPeoAff] > 0
    }
  ];
  
  // Disaster-specific sections
  const floodSections: MessageSection[] = [
    {
      format: (v) => `- ជម្លៀស: ${v[FloodSpecific.NumFamEva]} គ្រួសារ និងមនុស្ស ${v[FloodSpecific.NumPeoEva]} នាក់`,
      condition: (v) => v[FloodSpecific.NumFamEva] > 0 || v[FloodSpecific.NumPeoEva] > 0
    },
    {
      format: (v) => `- មនុស្ស: ស្លាប់ ${v[FloodSpecific.NumTDeath]} នាក់ របួស ${v[FloodSpecific.NumTInjure]} នាក់ និងបាត់ខ្លួន ${v[IncidentSpecific.ToNumMising]} នាក់`,
      condition: (v) => v[FloodSpecific.NumTDeath] > 0 || v[FloodSpecific.NumTInjure] > 0 || v[IncidentSpecific.ToNumMising] > 0
    },
    {
      format: (v) => `- ផ្ទះ: ប៉ះពាល់ ${v[FloodSpecific.NumHouAff]} ខ្នង និងខូចខាត ${v[FloodSpecific.NumHouDam]} ខ្នង`,
      condition: (v) => v[FloodSpecific.NumHouAff] > 0 || v[FloodSpecific.NumHouDam] > 0
    },
    {
      format: (v) => `- ប៉ះពាល់ផ្នែកកសិកម្ម: សន្ទូង/ពង្រោះ ${v[FloodSpecific.PaddyAff]} ហត សំណាប ${v[FloodSpecific.SamNabAff]} ហត និងដំណាំរួមផ្សំ ${v[FloodSpecific.FarmAff]} ហត`,
      condition: (v) => v[FloodSpecific.PaddyAff] > 0 || v[FloodSpecific.SamNabAff] > 0 || v[FloodSpecific.FarmAff] > 0
    },
    {
      format: (v) => `- ប៉ះពាល់ផ្លូវថ្នល់: ផ្លូវកៅស៊ូ ${v[FloodSpecific.RubberRoAff]} ម ផ្លូវបេតុង ${v[FloodSpecific.ConcretAff]} ម និងផ្លូវគ្រួសក្រហម ${v[FloodSpecific.RuralRoAff]} ម`,
      condition: (v) => v[FloodSpecific.RubberRoAff] > 0 || v[FloodSpecific.ConcretAff] > 0 || v[FloodSpecific.RuralRoAff] > 0
    },
    {
      format: (v) => `- ស្ពានបេតុង: ប៉ះពាល់ ${v[FloodSpecific.BridgeAff]} កន្លែង ខូចខាត ${v[FloodSpecific.BridgeDam]} កន្លែង`,
      condition: (v) => v[FloodSpecific.BridgeAff] > 0 || v[FloodSpecific.BridgeDam] > 0
    },
    {
      format: (v) => `- ស្ពានបេឡេត៍: ប៉ះពាល់ ${v[FloodSpecific.BeleBridAff]} កន្លែង ខូចខាត ${v[FloodSpecific.BeleBridDam]} កន្លែង`,
      condition: (v) => v[FloodSpecific.BeleBridAff] > 0 || v[FloodSpecific.BeleBridDam] > 0
    },
    // Not in Roth text, should we include?
    // {
    //   format: (v) => `- សាលារៀន: ប៉ះពាល់ ${v[FloodSpecific.NumSchoAff]} និងខូចខាត ${v[FloodSpecific.NumSchoDam]}`,
    //   condition: (v) => v[FloodSpecific.NumSchoAff] > 0 || v[FloodSpecific.NumSchoDam] > 0
    // }
  ];
  
  const droughtSections: MessageSection[] = [
    {
      format: (v) => `- សន្ទូង/ពង្រោះ: ប៉ះពាល់ ${v[DroughtSpecific.PaddyAff]} ហត និងខូចខាត ${v[DroughtSpecific.PaddyDam]} ហត`,
      condition: (v) => v[DroughtSpecific.PaddyAff] > 0 || v[DroughtSpecific.PaddyDam] > 0
    },
    {
      format: (v) => `- សំណាប: ប៉ះពាល់ ${v[DroughtSpecific.SamNabAff]} ហត និងខូចខាត ${v[DroughtSpecific.SamNabDam]} ហត`,
      condition: (v) => v[DroughtSpecific.SamNabAff] > 0 || v[DroughtSpecific.SamNabDam] > 0
    },
    {
      format: (v) => `- ដំណាំរួមផ្សំ: ប៉ះពាល់ ${v[DroughtSpecific.FarmAff]} ហត និងខូចខាត ${v[DroughtSpecific.FarmDam]} ហត`,
      condition: (v) => v[DroughtSpecific.FarmAff] > 0 || v[DroughtSpecific.FarmDam] > 0
    }
  ];
  
  const incidentSections: MessageSection[] = [
    {
      format: (v) => `- មនុស្ស: ស្លាប់ ${v[IncidentSpecific.NumDeathTo]} នាក់ របួស ${v[IncidentSpecific.ToNumInjure]} នាក់ និងបាត់ខ្លួន ${v[IncidentSpecific.ToNumMising]} នាក់`,
      condition: (v) => v[IncidentSpecific.NumDeathTo] > 0 || v[IncidentSpecific.ToNumInjure] > 0 || v[IncidentSpecific.ToNumMising] > 0
    },
    // Roth had a line for houses but the fields don't seem to exist for incidents
    {
      format: (v) => `- ផ្ទះ: ប៉ះពាល់ ${v[IncidentSpecific.SchAff]} ខ្នង និងខូចខាត ${v[IncidentSpecific.SchDam]} ខ្នង`,
      condition: (v) => v[IncidentSpecific.SchAff] > 0 || v[IncidentSpecific.SchDam] > 0
    },
  ];
  
  // Select sections based on disaster type
  let sections: MessageSection[] = [...commonSections];
  
  if (disasterType === FLOOD) {
    sections = [...sections, ...floodSections];
  } else if (disasterType === DROUGHT) {
    sections = [...sections, ...droughtSections];
  } else {
    sections = [...sections, ...incidentSections];
  }
  
  // Process each section
  sections.forEach(section => {
    if (!section.condition || section.condition(values)) {
      text += `${section.format(values)}\n`;
    }
  });
  
  // Add footer
  text += `\n${district}បានបញ្ជូនទិន្នន័យទៅក្នុងប្រព័ន្ធរួចហើយ`;
  text += `\nសូមចូលពិនិត្យ និងឯកភាព។ សូមអរគុណ`;
  text += `\n[ភ្ជាប់ទៅគេហទំព័រ](${new URL(commonFields.approvalLink, frontendUrl).toString()})`;

  return text;
};
