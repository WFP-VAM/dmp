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
  DROUGHT,
  DroughtDto,
  FLOOD,
  FloodDto,
  INCIDENT,
  IncidentDto,
  koboKeys,
} from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

// ask felix how to type something that could be a mix of all three
export const TableDisplay = ({
  forms,
}: {
  forms: FloodDto[] | DroughtDto[] | IncidentDto[] | undefined;
}): JSX.Element => {
  const formatForms = (
    formData: FloodDto[] | DroughtDto[] | IncidentDto[] | undefined,
  ) => {
    if (formData === undefined) {
      return [];
    }

    return formData.map(form => {
      let keys: {
        district: string;
        commune: string;
        province: string;
        disasterDate: string;
        entryName: string;
        phone: string;
        entryDate: string;
        disTyp: string;
        id: string;
      };
      if (koboKeys[FLOOD].disTyp in form) {
        keys = koboKeys[FLOOD];
      } else if (koboKeys[DROUGHT].disTyp in form) {
        keys = koboKeys[DROUGHT];
      } else {
        keys = koboKeys[INCIDENT];
      }

      return {
        district: form[keys.district] as string,
        commune: form[keys.commune] as string,
        disasterDate: form[keys.disasterDate] as string,
        disasterType: form[keys.disTyp] as string,
        type: form[keys.disTyp] as string,
        reportName: form[keys.entryName] as string,
        phone: form[keys.phone] as string,
        entryDate: form[keys.entryDate] as string,
        approvalLink: form[keys.id] as string,
        id: form[keys.id] as string,
      };
    });
  };

  const formattedForms = useMemo(() => formatForms(forms), [forms]);
  console.log('formatted', formattedForms);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>District</TableCell>
            <TableCell align="right">Commune</TableCell>
            <TableCell align="right">Disaster date</TableCell>
            <TableCell align="right">Type of disaster</TableCell>
            <TableCell align="right">Report entry name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Report entry date</TableCell>
            <TableCell align="right">Review and approval</TableCell>
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
              <TableCell align="right">{formattedForm.commune}</TableCell>
              <TableCell align="right">{formattedForm.disasterDate}</TableCell>
              <TableCell align="right">{formattedForm.disasterType}</TableCell>
              <TableCell align="right">{formattedForm.reportName}</TableCell>
              <TableCell align="right">{formattedForm.phone}</TableCell>
              <TableCell align="right">{formattedForm.entryDate}</TableCell>
              <TableCell align="right">{formattedForm.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
