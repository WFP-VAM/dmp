import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { BatchEditDialog, BatchEditWarningTooltip } from './BatchEditControls';
import { BasicFloodForm } from './utils';

export const TableHeader = ({
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
}): JSX.Element => (
  <TableHead>
    <TableRow sx={{ backgroundColor: 'var(--color_table_1)', color: 'black' }}>
      <TableCell sx={{ color: 'inherit' }}>
        <FormattedMessage id="forms_table.headers.row_number" />
      </TableCell>
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
      <TableCell sx={{ color: 'inherit', minWidth: '110px' }}>
        <FormattedMessage id="forms_table.headers.entry_date" />
      </TableCell>
      <TableCell sx={{ color: 'inherit' }}>
        <FormattedMessage id="forms_table.headers.dis_type" />
      </TableCell>
      {isFlood && (
        <TableCell sx={{ color: 'inherit', minWidth: '90px' }}>
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
      <TableCell sx={{ color: 'inherit', minWidth: '120px' }}>
        <FormattedMessage id="forms_table.headers.phone" />
      </TableCell>
      <TableCell sx={{ color: 'inherit', minWidth: '200px' }}>
        <FormattedMessage id="forms_table.headers.review_link" />
      </TableCell>
    </TableRow>
  </TableHead>
);
