/* eslint-disable complexity, max-lines */
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
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
  const [newFloodNumber, setNewFloodNumber] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const formattedForms = useMemo(
    () => formatForms(forms, !isUserAdmin),
    [forms, isUserAdmin],
  );

  const handleCheckboxChange = (form: FloodForm) => {
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

  const handleEditFloodNumber = () => {
    // Logic to update flood numbers for selected forms
    setDialogOpen(false);
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
      {isFlood && (
        <Stack direction="row" spacing={2} m={2}>
          <>
            {/* {batchEditMode && selectedForms.length > 0 && (
              <Button onClick={() => setDialogOpen(true)}>
                Edit {selectedForms.length} rows
              </Button>
            )}
            <Tooltip title="Batch edit flood numbers">
              <Button onClick={handleBatchEditClick}>
                {batchEditMode ? 'Cancel Batch Edit' : 'Edit Flood #'}
              </Button>
            </Tooltip> */}
            {batchEditMode && (
              <Typography color="red">
                You can only batch edit forms from the same province
              </Typography>
            )}
          </>
        </Stack>
      )}
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
              {isFlood && (
                <TableCell sx={{ color: 'inherit' }}>
                  <FormattedMessage id="forms_table.headers.flood_number" />
                  <Tooltip
                    title={batchEditMode ? 'Cancel' : 'Batch edit flood #'}
                  >
                    <IconButton
                      onClick={handleBatchEditClick}
                      sx={{ pr: 0, maxWidth: '30px', marginRight: -2 }}
                    >
                      {batchEditMode ? <CancelIcon /> : <EditIcon />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              )}
              {batchEditMode && (
                <TableCell sx={{ color: 'inherit' }}>
                  <FormattedMessage id="forms_table.headers.select" />
                  {selectedForms.length > 0 && (
                    <Tooltip title="Open edit dialog">
                      <IconButton
                        onClick={() => setDialogOpen(true)}
                        sx={{ pr: 0, maxWidth: '30px', marginRight: -2 }}
                      >
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  )}
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
                        onChange={() => handleCheckboxChange(formattedForm)}
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
        {batchEditMode && selectedForms.length > 0 && (
          <Button onClick={() => setDialogOpen(true)}>
            Edit {selectedForms.length} rows
          </Button>
        )}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>
            Edit flood number for {selectedForms.length} selected forms
          </DialogTitle>
          <DialogContent>
            <TextField
              type="number"
              label="New Flood Number"
              value={newFloodNumber}
              onChange={e => setNewFloodNumber(Number(e.target.value))}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleEditFloodNumber}
              disabled={newFloodNumber === null}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
};
