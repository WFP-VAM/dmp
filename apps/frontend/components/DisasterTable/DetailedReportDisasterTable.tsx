import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

import { addDetailedReportLocationColumns } from 'utils/tableFormatting';

import { DisasterTable } from './DisasterTable';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  rotateHeader?: boolean;
}

export const DetailedReportDisasterTable = ({
  columns,
  columnGroup,
  data,
  rotateHeader = false,
}: IProps): JSX.Element => {
  return (
    <DisasterTable
      columns={addDetailedReportLocationColumns(columns)}
      columnGroup={columnGroup}
      data={data}
      isEditable={false}
      getRowId={(row: { commune: string }) => row.commune}
      rotateHeader={rotateHeader}
    />
  );
};
