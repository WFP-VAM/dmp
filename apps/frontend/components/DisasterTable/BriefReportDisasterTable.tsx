import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

import { addBriefReportLocationColumns } from 'utils/tableFormatting';

import { DisasterTable } from './DisasterTable';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
}

export const BriefReportDisasterTable = ({
  columns,
  columnGroup,
  data,
}: IProps): JSX.Element => {
  return (
    <DisasterTable
      columns={addBriefReportLocationColumns(columns)}
      columnGroup={columnGroup}
      data={data}
      isEditable={false}
      getRowId={(row: { province: string }) => row.province}
    />
  );
};
