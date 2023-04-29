import { IncidentSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { aggregate } from './aggregate';
import {
  briefReportCountKeys,
  detailedReportFirstKeys,
} from './commonReportAggregateKeys';

const sumKeys = Object.values(IncidentSpecific);

export const generateIncidentDetailedReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.commune,
    firstKeys: detailedReportFirstKeys,
    sumKeys,
  });
};

export const generateIncidentBriefReport = (
  data: Record<string, string | undefined>[],
) => {
  return aggregate({
    data,
    groupKey: KoboCommonKeys.province,
    countKeys: briefReportCountKeys,
    sumKeys,
  });
};
