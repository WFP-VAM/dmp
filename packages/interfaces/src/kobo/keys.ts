import { DROUGHT, FLOOD, INCIDENT } from './constants';

export const koboKeys = {
  [FLOOD]: { province: 'g2/Province', disTyp: 'g2/DisTyp' },
  [DROUGHT]: { province: 'group_yu9nq00/Province', disTyp: 'group_yu9nq00/DisTyp' },
  [INCIDENT]: { province: 'G2/Province', disTyp: 'G2/DisTyp' },
} as const;
