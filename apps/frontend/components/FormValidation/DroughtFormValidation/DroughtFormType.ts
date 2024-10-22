import { droughtSpecificKeys } from '@wfp-dmp/interfaces';
import { Dayjs } from 'dayjs';

export type DroughtFormType = {
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
  specific: Record<keyof typeof droughtSpecificKeys, string | undefined>;
};
