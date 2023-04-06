import { DROUGHT, FLOOD, INCIDENT } from './constants';

export const koboKeys = {
  [FLOOD]: {
    district: 'g2/District',
    commune: 'g2/Commune',
    province: 'g2/Province',
    disasterDate: 'g2/Date_Dis',
    entryName: 'g1/q_Enum',
    phone: 'g1/q_Phone',
    entryDate: 'g1/Date_report',
    disTyp: 'g2/DisTyp',
    id: '_id',
  },
  [DROUGHT]: {
    district: 'group_yu9nq00/District',
    commune: 'group_yu9nq00/Commune',
    province: 'group_yu9nq00/Province',
    disasterDate: 'group_yu9nq00/Date_Dis',
    entryName: 'group_ve4vz14/q_Enum',
    phone: 'group_ve4vz14/q_Phone',
    entryDate: 'group_ve4vz14/Date_report',
    disTyp: 'group_yu9nq00/DisTyp',
    id: '_id',
  },
  [INCIDENT]: {
    district: 'G2/District',
    commune: 'G2/Commune',
    province: 'G2/Province',
    disasterDate: 'G2/Date_Dis',
    entryName: 'G1/q_Enum',
    phone: 'G1/q_Phone',
    entryDate: 'G1/Date_report',
    disTyp: 'G2/DisTyp',
    id: '_id',
  },
} as const;
