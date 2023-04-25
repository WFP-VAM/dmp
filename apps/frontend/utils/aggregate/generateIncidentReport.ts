import { IncidentSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { aggregate } from './aggregate';

const firstKeys = [KoboCommonKeys.province, KoboCommonKeys.district];

const sumKeys = Object.values(IncidentSpecific);

export const generateIncidentDetailedReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.commune,
    firstKeys,
    sumKeys,
  });
};
