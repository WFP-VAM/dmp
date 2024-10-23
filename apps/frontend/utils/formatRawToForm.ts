import {
  DroughtDto,
  droughtSpecificKeys,
  FloodDto,
  floodSpecificKeys,
  formatCommonFields,
  IncidentDto,
  incidentSpecificKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';
import { mapValues } from 'lodash';

export const formatFloodFields = (form: FloodDto) => ({
  ...formatCommonFields(form),
  ...mapValues(floodSpecificKeys, value => form[value]),
});

export const formatDroughtFields = (form: DroughtDto) => ({
  ...formatCommonFields(form),
  ...mapValues(droughtSpecificKeys, value => form[value] ?? ''),
});

export const formatIncidentFields = (form: IncidentDto) => ({
  ...formatCommonFields(form),
  ...mapValues(incidentSpecificKeys, value => form[value]),
});

/**
 * Filters and deduplicates flood reports based on floodN and commune.
 *
 * This function groups flood reports by a combination of floodN and commune.
 * For each group with multiple reports, it selects the most recent one based on
 * the submission time. This helps to eliminate duplicate reports and ensure
 * that only the latest information for each unique flood event is retained.
 *
 * @param floodData - An array of formatted flood reports
 * @returns An array of filtered and deduplicated flood reports
 */
export const filterFloodReports = (
  floodData: ReturnType<typeof formatFloodFields>[],
): ReturnType<typeof formatFloodFields>[] => {
  const groupedReports = floodData.reduce((acc, report) => {
    const key = `${report.floodN ?? 0}_${report.commune}`;
    console.log({ key });
    if (!(key in acc)) {
      acc[key] = [];
    }
    acc[key].push(report);

    return acc;
  }, {} as Record<string, ReturnType<typeof formatFloodFields>[]>);

  return Object.values(groupedReports).map(reports => {
    if (reports.length === 1) {
      return reports[0];
    }

    // Sort by disasterDate first, then by submissionTime, and return the first report
    return reports.sort((a, b) => {
      const disasterDateDiff =
        dayjs(b.disasterDate).valueOf() - dayjs(a.disasterDate).valueOf();
      if (disasterDateDiff !== 0) {
        return disasterDateDiff;
      }

      // If disasterDate is the same, sort by submissionTime
      return (
        dayjs(b.submissionTime).valueOf() - dayjs(a.submissionTime).valueOf()
      );
    })[0];
  });
};
