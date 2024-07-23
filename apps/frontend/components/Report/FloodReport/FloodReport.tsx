import { FloodDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';
import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';
import {
  generateFloodCommuneLevelReport,
  generateFloodProvinceLevelReport,
} from 'utils/aggregate/generateFloodReport';
import { formatFloodFields } from 'utils/formatRawToForm';

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
    const formattedForms = forms.map(form => formatFloodFields(form));

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
          columns={SummaryFloodReportColumnSettings.columns}
          columnGroup={SummaryFloodReportColumnSettings.columnGroup}
          data={report}
          rotateHeader={false}
          border
          showMenuOnLocation
        />
      ) : (
        <ProvinceLevelReportTable
          columns={SummaryFloodReportColumnSettings.columns}
          columnGroup={SummaryFloodReportColumnSettings.columnGroup}
          data={report}
          rotateHeader={false}
          border
          showMenuOnLocation
        />
      )}
    </>
  );
};
