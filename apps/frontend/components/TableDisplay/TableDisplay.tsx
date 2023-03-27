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
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>District</TableCell>
            <TableCell>Commune</TableCell>
            <TableCell>Disaster date</TableCell>
            <TableCell>Type of disaster</TableCell>
            <TableCell>Report entry name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Report entry date</TableCell>
            <TableCell>Review and approval</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedForms.map(formattedForm => (
            <TableRow
              key={formattedForm.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {formattedForm.district}
              </TableCell>
              <TableCell>{formattedForm.commune}</TableCell>
              <TableCell>{formattedForm.disasterDate}</TableCell>
              <TableCell>{formattedForm.disasterType}</TableCell>
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
