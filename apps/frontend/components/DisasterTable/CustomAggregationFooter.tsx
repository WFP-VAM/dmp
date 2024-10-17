import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export interface CustomAggregationFooterProps {
  data: Record<string, string | number | undefined>[];
  columns: GridColDef[];
}

export const CustomAggregationFooter = ({
  data,
  columns,
}: CustomAggregationFooterProps) => {
  const aggegatedData = data.reduce<Record<string, number | undefined>>(
    (acc, row) => {
      columns.forEach(({ type, field }) => {
        if (type === 'number') {
          acc[field] = (acc[field] ?? 0) + Number(row[field] ?? 0);
        }
      });

      return acc;
    },
    {},
  );

  return (
    <Box className="MuiDataGrid-row">
      {columns.map((column, i) => (
        <Box
          key={column.field}
          width={column.width}
          className={
            'MuiDataGrid-cell MuiDataGrid-cell--withRightBorder' +
            (column.type === 'number' ? ' MuiDataGrid-cell--textRight' : '')
          }
        >
          <b>{i === 0 ? 'Total' : aggegatedData[column.field]}</b>
        </Box>
      ))}
    </Box>
  );
};
