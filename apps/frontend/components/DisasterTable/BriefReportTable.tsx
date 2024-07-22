import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

import { addBriefReportLocationColumns } from 'utils/tableFormatting';

import { DisasterTable } from './DisasterTable';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  rotateHeader?: boolean;
  border?: boolean;
  columnHeaderHeight?: number;
  showMenuOnLocation?: boolean;
}

export const BriefReportTable = ({
  columns,
  columnGroup,
  data,
  rotateHeader = false,
  border,
  columnHeaderHeight,
  showMenuOnLocation = false,
}: IProps): JSX.Element => {
  return (
    <DisasterTable
      columns={addBriefReportLocationColumns(
        columns,
        border,
        showMenuOnLocation,
      )}
      columnGroup={columnGroup}
      data={data}
      isEditable={false}
      getRowId={(row: { province: string }) => row.province}
      rotateHeader={rotateHeader}
      border={border}
      columnHeaderHeight={columnHeaderHeight}
    />
  );
};
