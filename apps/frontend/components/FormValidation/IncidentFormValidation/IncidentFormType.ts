import { incidentSpecificKeys } from '@wfp-dmp/interfaces';
import { Dayjs } from 'dayjs';
import { FieldValues } from 'react-hook-form';

export interface IncidentFormType extends FieldValues {
  region: {
    province: string[];
    district: string[];
    commune: string[];
    village: string;
  };
  interviewer: string;
  disTyp: string;
  phone: string;
  reportDate: Dayjs;
  incidentDate: Dayjs;
  specific: Record<keyof typeof incidentSpecificKeys, string | undefined>;
}
