import { DROUGHT, FLOOD, INCIDENT } from './constants';

export const koboKeys = {
  [FLOOD]: { province: 'g2/Province' },
  [DROUGHT]: { province: 'group_yu9nq00/Province' },
  [INCIDENT]: { province: 'G2/Province' },
} as const;
