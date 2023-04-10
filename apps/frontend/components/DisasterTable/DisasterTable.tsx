import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRowModel,
} from '@mui/x-data-grid';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
  isEditable: boolean;
}

export const DisasterTable = ({
  columns,
  columnGroup,
  data,
  onChange,
  isEditable,
}: IProps): JSX.Element => {
  return (
    <Box style={{ maxWidth: 1200, height: 240 }}>
      <DataGrid
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: isEditable ? '' : 'none',
          },
        }}
        disableRowSelectionOnClick={!isEditable}
        showCellVerticalBorder
        showColumnVerticalBorder
        rows={data}
        columns={columns}
        hideFooter
        experimentalFeatures={{ columnGrouping: true }}
        columnGroupingModel={columnGroup}
        isCellEditable={() => isEditable}
        processRowUpdate={(newRow: GridRowModel) => {
          onChange(newRow);

          return newRow;
        }}
      />
    </Box>
  );
};
