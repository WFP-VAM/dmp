import { incidentSpecificKeys } from '@wfp-dmp/interfaces';
import { Dayjs } from 'dayjs';

export type IncidentFormType = {
  region: {
    province: string;
    district: string;
    commune: string;
  };
  interviewer: string;
  disTyp: string;
  phone: string;
  reportDate: Dayjs;
  incidentDate: Dayjs;
  specific: Record<keyof typeof incidentSpecificKeys, string | undefined>;
};
