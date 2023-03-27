import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  DisasterDtosType,
  DROUGHT,
  FLOOD,
  INCIDENT,
  koboKeys,
} from '@wfp-dmp/interfaces';
import { isDrought, isFlood } from '@wfp-dmp/interfaces/dist/kobo/utils';
import path from 'path';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

export const TableDisplay = ({
  forms,
}: {
  forms: DisasterDtosType;
}): JSX.Element => {
  const formatForms = (formData: DisasterDtosType) => {
    if (formData.length === 0) {
      return [];
    }

    return formData.map(form => {
      if (isFlood(form)) {
        const keys = koboKeys[FLOOD];

        return {
          province: form[keys.province],
          district: form[keys.district],
          commune: form[keys.commune],
          disasterDate: form[keys.disasterDate],
          disasterType: form[keys.disTyp],
          type: form[keys.disTyp],
          reportName: form[keys.entryName],
          phone: form[keys.phone],
          entryDate: form[keys.entryDate],
          approvalLink: path.join('form', FLOOD, form[keys.id].toString()),
          id: form[keys.id],
        };
      } else if (isDrought(form)) {
        const keys = koboKeys[DROUGHT];

        return {
          province: form[keys.province],
          district: form[keys.district],
          commune: form[keys.commune],
          disasterDate: form[keys.disasterDate],
          disasterType: form[keys.disTyp],
          type: form[keys.disTyp],
          reportName: form[keys.entryName],
          phone: form[keys.phone],
          entryDate: form[keys.entryDate],
          approvalLink: path.join('form', DROUGHT, form[keys.id].toString()),
          id: form[keys.id],
        };
      } else {
        const keys = koboKeys[INCIDENT];

        return {
          province: form[keys.province],
          district: form[keys.district],
          commune: form[keys.commune],
          disasterDate: form[keys.disasterDate],
          disasterType: form[keys.disTyp],
          type: form[keys.disTyp],
          reportName: form[keys.entryName],
          phone: form[keys.phone],
          entryDate: form[keys.entryDate],
          approvalLink: path.join('form', INCIDENT, form[keys.id].toString()),
          id: form[keys.id],
        };
      }
    });
  };

  const formattedForms = useMemo(() => formatForms(forms), [forms]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage id="forms_table.headers.province" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="forms_table.headers.district" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="forms_table.headers.commune" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="forms_table.headers.dis_date" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="forms_table.headers.dis_type" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="forms_table.headers.entry_name" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="forms_table.headers.phone" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="forms_table.headers.entry_date" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="forms_table.headers.review_link" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedForms.map(formattedForm => (
            <TableRow key={formattedForm.id}>
              <TableCell>
                <FormattedMessage id={`provinces.${formattedForm.province}`} />
              </TableCell>
              <TableCell>
                <FormattedMessage id={`districts.${formattedForm.district}`} />
              </TableCell>
              <TableCell>
                <FormattedMessage id={`communes.${formattedForm.commune}`} />
              </TableCell>
              <TableCell>{formattedForm.disasterDate}</TableCell>
              <TableCell>
                <FormattedMessage
                  id={`disasters.${formattedForm.disasterType}`}
                />
              </TableCell>
              <TableCell>{formattedForm.reportName}</TableCell>
              <TableCell>{formattedForm.phone}</TableCell>
              <TableCell>{formattedForm.entryDate}</TableCell>
              <TableCell>{formattedForm.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
