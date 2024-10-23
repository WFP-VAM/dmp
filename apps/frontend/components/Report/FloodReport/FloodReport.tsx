import { FloodDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';
import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';
import {
  generateFloodCommuneLevelReport,
  generateFloodProvinceLevelReport,
} from 'utils/aggregate/generateFloodReport';
import { filterFloodReports, formatFloodFields } from 'utils/formatRawToForm';

import { CommuneLevelFloodReport } from './CommuneLevelFloodReport';
import { ProvinceLevelFloodReport } from './ProvinceLevelFloodReport';
import { SummaryFloodReportColumnSettings } from './tablesConfig/SummaryReport';

export const FloodReport = ({
  forms,
  isCommuneLevelReport,
  isAllColumnReport,
}: {
  forms: FloodDto[];
  isCommuneLevelReport: boolean;
  isAllColumnReport: boolean;
}) => {
  const report = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log({ forms });
    const formattedForms = filterFloodReports(
      forms.map(form => formatFloodFields(form)),
    );
    // eslint-disable-next-line no-console
    console.log({ filteredForms: formattedForms });

    return isCommuneLevelReport
      ? generateFloodCommuneLevelReport(formattedForms)
      : generateFloodProvinceLevelReport(formattedForms);
  }, [forms, isCommuneLevelReport]);

  if (isAllColumnReport) {
    return (
      <>
        {isCommuneLevelReport ? (
          <CommuneLevelFloodReport report={report} />
        ) : (
          <ProvinceLevelFloodReport report={report} />
        )}
      </>
    );
  }

  return (
    <>
      {isCommuneLevelReport ? (
        <CommuneLevelReportTable
          locationParams={{
            columns: SummaryFloodReportColumnSettings.columns,
            columnGroup: SummaryFloodReportColumnSettings.columnGroup,
          }}
          disasterTableParams={{
            data: report,
            variant: 'bordered',
          }}
        />
      ) : (
        <ProvinceLevelReportTable
          locationParams={{
            columns: SummaryFloodReportColumnSettings.columns,
            columnGroup: SummaryFloodReportColumnSettings.columnGroup,
          }}
          disasterTableParams={{
            data: report,
            variant: 'bordered',
          }}
        />
      )}
    </>
  );
};
