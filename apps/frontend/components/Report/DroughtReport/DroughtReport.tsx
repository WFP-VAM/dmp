import { DroughtDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { CommuneLevelReportTable } from 'components/DisasterTable/CommuneLevelReportTable';
import { ProvinceLevelReportTable } from 'components/DisasterTable/ProvinceLevelReportTable';
import {
  generateDroughtCommuneLevelReport,
  generateDroughtProvinceLevelReport,
} from 'utils/aggregate/generateDroughtReport';
import { formatDroughtFields } from 'utils/formatRawToForm';

import { CommuneLevelDroughtReport } from './CommuneLevelDroughtReport';
import { ProvinceLevelDroughtReport } from './ProvinceLevelDroughtReport';
import { SummaryDroughtReportColumnSettings } from './tablesConfig/SummaryReport';

export const DroughtReport = ({
  forms,
  isCommuneLevelReport,
  isAllColumnReport,
}: {
  forms: DroughtDto[];
  isCommuneLevelReport: boolean;
  isAllColumnReport: boolean;
}) => {
  const report = useMemo(() => {
    const formattedForms = forms.map(form => formatDroughtFields(form));

    return isCommuneLevelReport
      ? generateDroughtCommuneLevelReport(formattedForms)
      : generateDroughtProvinceLevelReport(formattedForms);
  }, [forms, isCommuneLevelReport]);

  if (isAllColumnReport) {
    return (
      <>
        {isCommuneLevelReport ? (
          <CommuneLevelDroughtReport report={report} />
        ) : (
          <ProvinceLevelDroughtReport report={report} />
        )}
      </>
    );
  }

  return (
    <>
      {isCommuneLevelReport ? (
        <CommuneLevelReportTable
          columns={SummaryDroughtReportColumnSettings.columns}
          columnGroup={SummaryDroughtReportColumnSettings.columnGroup}
          data={report}
          rotateHeader={false}
          border
          showMenuOnLocation
        />
      ) : (
        <ProvinceLevelReportTable
          columns={SummaryDroughtReportColumnSettings.columns}
          columnGroup={SummaryDroughtReportColumnSettings.columnGroup}
          data={report}
          rotateHeader={false}
          border
          showMenuOnLocation
        />
      )}
    </>
  );
};
