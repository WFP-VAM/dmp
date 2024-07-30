import { Stack, Typography, useTheme } from '@mui/material';
import { IncidentDto, KoboCommonKeys } from '@wfp-dmp/interfaces';
import { groupBy, map } from 'lodash';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  generateIncidentCommuneLevelReport,
  generateIncidentProvinceLevelReport,
} from 'utils/aggregate/generateIncidentReport';
import { formatIncidentFields } from 'utils/formatRawToForm';

import { IncidentSpecificReport } from './IncidentSpecificReport';

export const IncidentReport = ({
  forms,
  isCommuneLevelReport,
  isAllColumnReport,
}: {
  forms: IncidentDto[];
  isCommuneLevelReport: boolean;
  isAllColumnReport: boolean;
}) => {
  const theme = useTheme();

  const reports = useMemo(() => {
    const formattedForms = forms.map(form => formatIncidentFields(form));
    const groupedData = groupBy(formattedForms, KoboCommonKeys.disTyp);

    return map(groupedData, (incidentSpecificForms, incidentKey) => {
      return {
        incidentKey,
        report: isCommuneLevelReport
          ? generateIncidentCommuneLevelReport(incidentSpecificForms)
          : generateIncidentProvinceLevelReport(incidentSpecificForms),
      };
    });
  }, [forms, isCommuneLevelReport]);

  return (
    <Stack gap={theme.spacing(8)}>
      {reports.map(incidentSpecific => {
        return (
          <Stack key={incidentSpecific.incidentKey}>
            <Typography
              fontWeight="bold"
              sx={{
                '@media print': {
                  paddingLeft: '2rem',
                },
              }}
            >
              <FormattedMessage
                id={`disasters.${incidentSpecific.incidentKey}`}
              />
            </Typography>
            <IncidentSpecificReport
              report={incidentSpecific.report}
              isCommuneLevelReport={isCommuneLevelReport}
              isAllColumnReport={isAllColumnReport}
            />
          </Stack>
        );
      })}
    </Stack>
  );
};
