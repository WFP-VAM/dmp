import { IncidentSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { aggregate } from './aggregate';
import {
  communeLeveldReportFirstKeys,
  provinceLevelReportCountKeys,
} from './commonReportAggregateKeys';

const sumKeys = Object.values(IncidentSpecific);

export const generateIncidentCommuneLevelReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.commune,
    firstKeys: communeLeveldReportFirstKeys,
    sumKeys,
  });
};

export const generateIncidentProvinceLevelReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.province,
    countKeys: provinceLevelReportCountKeys,
    sumKeys,
  });
};
