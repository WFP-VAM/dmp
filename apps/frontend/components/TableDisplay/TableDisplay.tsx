import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  DisasterDtoType,
  formatCommonFields,
  ValidationStatusValue,
} from '@wfp-dmp/interfaces';
import { orderBy } from 'lodash';
import Link from 'next/link';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { ValidationIndicator } from 'components/FormValidation/ValidationIndicator';
import { dropNotApproved } from 'utils/dropNotApproved';

const formatForms = (forms: DisasterDtoType[] | undefined) => {
  if (forms === undefined || forms.length === 0) {
    return [];
  }

  // Filter out rejected forms and order by date descending
  // using disasterDate then submissionTime.
  const formattedForms = dropNotApproved(forms).map(form => {
    return formatCommonFields(form);
  });

  return orderBy(
    formattedForms,
    ['disasterDate', 'submissionTime'],
    ['desc', 'desc'],
  );
};

export const TableDisplay = ({
  forms,
  isLoading,
}: {
  forms?: DisasterDtoType[];
  isLoading: boolean;
}): JSX.Element => {
  const formattedForms = useMemo(() => formatForms(forms), [forms]);

  if (!isLoading && formattedForms.length === 0) {
    return (
      <Typography>
        <FormattedMessage id="forms_table.no_forms" />
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ m: 2 }}>
      <Table sx={{ '& .MuiTableCell-root': { border: '1px solid #ccc' } }}>
        <TableHead>
          <TableRow
            sx={{ backgroundColor: 'var(--color_table_1)', color: 'black' }}
          >
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
            <TableCell sx={{ color: 'inherit', width: '110px' }}>
              <FormattedMessage id="forms_table.headers.entry_date" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.dis_type" />
            </TableCell>
            <TableCell sx={{ color: 'inherit' }}>
              <FormattedMessage id="forms_table.headers.entry_name" />
            </TableCell>
            <TableCell sx={{ color: 'inherit', width: '120px' }}>
              <FormattedMessage id="forms_table.headers.phone" />
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
                <TableCell>{formattedForm.entryDate}</TableCell>
                <TableCell>
                  <FormattedMessage id={`disasters.${formattedForm.disTyp}`} />
                </TableCell>
                <TableCell>{formattedForm.entryName}</TableCell>
                <TableCell>{formattedForm.phone}</TableCell>
                <TableCell>
                  <Link
                    href={formattedForm.approvalLink}
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ValidationIndicator
                      valStatus={
                        formattedForm.validationStatus as ValidationStatusValue
                      }
                      textVersion
                    />
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
