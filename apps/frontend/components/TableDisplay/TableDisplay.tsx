import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DisasterDtoType, formatCommonFields } from '@wfp-dmp/interfaces';
import Link from 'next/link';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

const formatForms = (forms: DisasterDtoType[] | undefined) => {
  if (forms === undefined || forms.length === 0) {
    return [];
  }

  return forms.map(form => {
    return formatCommonFields(form);
  });
};

export const TableDisplay = ({
  forms,
  isLoading,
}: {
  forms?: DisasterDtoType[];
  isLoading: boolean;
}): JSX.Element => {
  const formattedForms = useMemo(() => formatForms(forms), [forms]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#013399', color: 'white' }}>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.province" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.district" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.commune" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.dis_date" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.dis_type" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.entry_name" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.phone" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.entry_date" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.review_link" />
            </TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <TableBody>
            {[1, 2, 3].map(id => {
              return (
                <TableRow key={id}>
                  <TableCell colSpan={9}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            {formattedForms.map(formattedForm => (
              <TableRow key={formattedForm.id}>
                <TableCell>
                  <FormattedMessage id={`province.${formattedForm.province}`} />
                </TableCell>
                <TableCell>
                  <FormattedMessage id={`district.${formattedForm.district}`} />
                </TableCell>
                <TableCell>
                  <FormattedMessage id={`commune.${formattedForm.commune}`} />
                </TableCell>
                <TableCell>{formattedForm.disasterDate}</TableCell>
                <TableCell>
                  <FormattedMessage id={`disasters.${formattedForm.disTyp}`} />
                </TableCell>
                <TableCell>{formattedForm.entryName}</TableCell>
                <TableCell>{formattedForm.phone}</TableCell>
                <TableCell>{formattedForm.entryDate}</TableCell>
                <TableCell>
                  <Link href={formattedForm.approvalLink}>
                    <FormattedMessage id={'forms_table.link.review'} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};
