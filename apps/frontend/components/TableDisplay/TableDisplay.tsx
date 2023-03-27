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
import path from 'path';
import { useMemo } from 'react';

type union = (FloodDto | DroughtDto | IncidentDto)[];
export const TableDisplay = ({ forms }: { forms: union }): JSX.Element => {
  const formatForms = (formData: union) => {
    if (formData.length === 0) {
      return [];
    }

    return formData.map(form => {
      const isFlood = (
        furm: FloodDto | DroughtDto | IncidentDto,
      ): furm is FloodDto => {
        return koboKeys[FLOOD].disTyp in furm;
      };
      const isDrought = (
        furm: FloodDto | DroughtDto | IncidentDto,
      ): furm is DroughtDto => {
        return koboKeys[DROUGHT].disTyp in furm;
      };

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
  console.log('formatted', formattedForms);

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
