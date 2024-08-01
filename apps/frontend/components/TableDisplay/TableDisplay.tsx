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
import { DisasterDtoType, ValidationStatusValue } from '@wfp-dmp/interfaces';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ValidationLinkButton } from 'components/FormValidation/ValidationIndicator';
import { useAuth } from 'context/auth';

import { formatDate } from '../../utils/date';
import { BatchEditDialog, BatchEditWarningTooltip } from './BatchEditControls';
import { BasicFloodForm, formatForms } from './utils';

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
  selectedForms: BasicFloodForm[];
  handleEditFloodNumber: (newFloodNumber: number) => void;
  lastCheckboxPosition: { top: number; left: number } | null;
  setSelectedForms: (forms: BasicFloodForm[]) => void;
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
        <TableCell sx={{ color: 'inherit', width: '100px' }}>
          {batchEditMode && <BatchEditWarningTooltip />}
          <FormattedMessage id="forms_table.headers.flood_number" />
          <br />
          <BatchEditDialog
            batchEditMode={batchEditMode}
            selectedForms={selectedForms}
            handleBatchEditClick={handleBatchEditClick}
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
      <TableCell sx={{ color: 'inherit', width: '200px' }}>
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
  const [selectedForms, setSelectedForms] = useState<BasicFloodForm[]>([]);
  const [lastCheckboxPosition, setLastCheckboxPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const dropRejectedForms = !isUserAdmin;
  const formattedForms = useMemo(
    () => formatForms(forms, dropRejectedForms),
    [forms, dropRejectedForms],
  );

  const handleCheckboxChange = (
    form: BasicFloodForm,
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
      <TableContainer
        component={Paper}
        sx={{ m: 2, width: 'calc(100% - 32px)' }}
      >
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
                  {isFlood && (
                    <TableCell sx={{ textAlign: 'center' }}>
                      {formattedForm.floodN}
                      {batchEditMode && (
                        <Checkbox
                          checked={selectedForms.includes(formattedForm)}
                          onChange={e => handleCheckboxChange(formattedForm, e)}
                          disabled={
                            selectedForms.length > 0 &&
                            selectedForms.some(
                              f => f.province !== formattedForm.province,
                            )
                          }
                          sx={{
                            maxHeight: '20px',
                            color: 'black',
                            '&.Mui-checked': {
                              color: 'black',
                            },
                          }}
                        />
                      )}
                    </TableCell>
                  )}
                  <TableCell>{formattedForm.entryName}</TableCell>
                  <TableCell>{formattedForm.phone}</TableCell>
                  <TableCell>
                    <ValidationLinkButton
                      valStatus={
                        formattedForm.validationStatus as ValidationStatusValue
                      }
                      valLink={formattedForm.approvalLink}
                    />
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
