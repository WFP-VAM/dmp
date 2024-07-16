/* eslint-disable max-lines */
import {
  Checkbox,
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
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ValidationIndicator } from 'components/FormValidation/ValidationIndicator';
import { useAuth } from 'context/auth';
import { dropNotApproved } from 'utils/dropNotApproved';

import { formatDate } from '../../utils/date';
import {
  BatchEditControl,
  BatchEditDialog,
  BatchEditWarning,
} from './BatchEditControls';

const formatForms = (
  forms: DisasterDtoType[] | undefined,
  dropRejected: boolean,
) => {
  if (forms === undefined || forms.length === 0) {
    return [];
  }

  // Filter out rejected forms and order by date descending
  // using disasterDate then submissionTime.
  const formattedForms = (dropRejected ? dropNotApproved(forms) : forms).map(
    form => {
      return formatCommonFields(form);
    },
  );

  return orderBy(
    formattedForms,
    ['disasterDate', 'submissionTime'],
    ['desc', 'desc'],
  );
};

type FloodForm = {
  id: string;
  province: string;
};

const TableHeader = ({
  isFlood,
  batchEditMode,
  handleBatchEditClick,
  selectedForms,
  handleEditFloodNumber,
  lastCheckboxPosition,
}: {
  isFlood: boolean;
  batchEditMode: boolean;
  handleBatchEditClick: () => void;
  selectedForms: FloodForm[];
  handleEditFloodNumber: (newFloodNumber: number) => void;
  lastCheckboxPosition: { top: number; left: number } | null;
  setSelectedForms: (forms: FloodForm[]) => void;
}) => (
  <TableHead>
    <TableRow sx={{ backgroundColor: 'var(--color_table_1)', color: 'black' }}>
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
      {isFlood && (
        <TableCell sx={{ color: 'inherit' }}>
          <FormattedMessage id="forms_table.headers.flood_number" />
          <BatchEditControl
            batchEditMode={batchEditMode}
            handleBatchEditClick={handleBatchEditClick}
          />
        </TableCell>
      )}
      {batchEditMode && (
        <TableCell sx={{ color: 'inherit' }}>
          <FormattedMessage id="forms_table.headers.select" />
          <BatchEditDialog
            batchEditMode={batchEditMode}
            selectedForms={selectedForms}
            handleEditFloodNumber={handleEditFloodNumber}
            lastCheckboxPosition={lastCheckboxPosition}
          />
        </TableCell>
      )}
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
);

export const TableDisplay = ({
  forms,
  isLoading,
  isFlood,
}: {
  forms?: DisasterDtoType[];
  isLoading: boolean;
  isFlood: boolean;
}): JSX.Element => {
  const { user } = useAuth();
  const isUserAdmin = Boolean(user && ['admin'].includes(user.roles[0]));
  const [batchEditMode, setBatchEditMode] = useState(false);
  const [selectedForms, setSelectedForms] = useState<FloodForm[]>([]);
  const [lastCheckboxPosition, setLastCheckboxPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const formattedForms = useMemo(
    () => formatForms(forms, !isUserAdmin),
    [forms, isUserAdmin],
  );

  const handleCheckboxChange = (
    form: FloodForm,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checkbox = event.target as HTMLElement;
    const rect = checkbox.getBoundingClientRect();
    setLastCheckboxPosition({ top: rect.top, left: rect.right });

    setSelectedForms(prev =>
      prev.includes(form)
        ? prev.filter(f => f.id !== form.id)
        : [...prev, form],
    );
  };

  const handleBatchEditClick = () => {
    setBatchEditMode(!batchEditMode);
    setSelectedForms([]);
  };

  const handleEditFloodNumber = (newFloodNumber: number) => {
    // Update flood numbers for selected forms after batch edit
    formattedForms.forEach(form => {
      if (selectedForms.some(f => f.id === form.id)) {
        form.floodN = `${newFloodNumber}`;
      }
    });
    setSelectedForms([]);
    setBatchEditMode(false);
  };

  if (!isLoading && formattedForms.length === 0) {
    return (
      <Typography>
        <FormattedMessage id="forms_table.no_forms" />
      </Typography>
    );
  }

  return (
    <>
      {batchEditMode && <BatchEditWarning />}
      <TableContainer component={Paper} sx={{ m: 2 }}>
        <Table sx={{ '& .MuiTableCell-root': { border: '1px solid #ccc' } }}>
          <TableHeader
            isFlood={isFlood}
            batchEditMode={batchEditMode}
            handleBatchEditClick={handleBatchEditClick}
            selectedForms={selectedForms}
            handleEditFloodNumber={handleEditFloodNumber}
            lastCheckboxPosition={lastCheckboxPosition}
            setSelectedForms={setSelectedForms}
          />
          {isLoading ? (
            <TableBody>
              {[1, 2, 3].map(id => (
                <TableRow key={id}>
                  <TableCell colSpan={isFlood ? 10 : 9}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {formattedForms.map(formattedForm => (
                <TableRow key={formattedForm.id}>
                  <TableCell>
                    <FormattedMessage
                      id={`province.${formattedForm.province}`}
                    />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage
                      id={`district.${formattedForm.district}`}
                    />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id={`commune.${formattedForm.commune}`} />
                  </TableCell>
                  <TableCell>
                    {formatDate(formattedForm.disasterDate)}
                  </TableCell>
                  <TableCell>{formatDate(formattedForm.entryDate)}</TableCell>
                  <TableCell>
                    <FormattedMessage
                      id={`disasters.${formattedForm.disTyp}`}
                    />
                  </TableCell>
                  {isFlood && <TableCell>{formattedForm.floodN}</TableCell>}
                  {batchEditMode && (
                    <TableCell>
                      <Checkbox
                        checked={selectedForms.includes(formattedForm)}
                        onChange={e => handleCheckboxChange(formattedForm, e)}
                        disabled={
                          selectedForms.length > 0 &&
                          selectedForms.some(
                            f => f.province !== formattedForm.province,
                          )
                        }
                      />
                    </TableCell>
                  )}
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
    </>
  );
};
