import { Typography } from '@mui/material';
import { IncidentDto, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { chain } from 'lodash';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  generateIncidentBriefReport,
  generateIncidentDetailedReport,
} from 'utils/aggregate/generateIncidentReport';
import { formatIncidentFields } from 'utils/formatRawToForm';

import { IncidentSpecificReport } from './IncidentSpecificReport';

export const IncidentReport = ({
  forms,
  isDetailedReport,
  isAllColumnReport,
}: {
  forms: IncidentDto[];
  isDetailedReport: boolean;
  isAllColumnReport: boolean;
}) => {
  const reports = useMemo(() => {
    const formattedForms = forms.map(form => formatIncidentFields(form));

    return chain(formattedForms)
      .groupBy(KoboCommonKeys.disTyp)
      .map((incidentSpecificForms, incidentKey) => {
        return {
          incidentKey,
          report: isDetailedReport
            ? generateIncidentDetailedReport(incidentSpecificForms)
            : generateIncidentBriefReport(incidentSpecificForms),
        };
      })
      .value();
  }, [forms, isDetailedReport]);

  return (
    <>
      {reports.map(incidentSpecific => {
        return (
          <>
            <Typography fontWeight="bold">
              <FormattedMessage
                id={`disasters.${incidentSpecific.incidentKey}`}
              />
            </Typography>
            <IncidentSpecificReport
              report={incidentSpecific.report}
              isDetailedReport={isDetailedReport}
              isAllColumnReport={isAllColumnReport}
            />
          </>
        );
      })}
    </>
  );
};
