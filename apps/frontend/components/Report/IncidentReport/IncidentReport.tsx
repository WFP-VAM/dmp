import { Stack, Typography, useTheme } from '@mui/material';
import { IncidentDto, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { groupBy, map } from 'lodash';
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
  const theme = useTheme();

  const reports = useMemo(() => {
    const formattedForms = forms.map(form => formatIncidentFields(form));
    const groupedData = groupBy(formattedForms, KoboCommonKeys.disTyp);

    return map(groupedData, (incidentSpecificForms, incidentKey) => {
      return {
        incidentKey,
        report: isDetailedReport
          ? generateIncidentDetailedReport(incidentSpecificForms)
          : generateIncidentBriefReport(incidentSpecificForms),
      };
    });
  }, [forms, isDetailedReport]);

  return (
    <Stack gap={theme.spacing(8)}>
      {reports.map(incidentSpecific => {
        return (
          <Stack key={incidentSpecific.incidentKey}>
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
          </Stack>
        );
      })}
    </Stack>
  );
};
