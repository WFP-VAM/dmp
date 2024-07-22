import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

import { addBriefReportLocationColumns } from 'utils/tableFormatting';

import { DisasterTable } from './DisasterTable';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  rotateHeader?: boolean;
  border?: boolean;
  columnHeaderHeight?: 'large' | 'normal';
  showMenuOnLocation?: boolean;
  hideTopRightBorder?: boolean;
}

export const BriefReportTable = ({
  columns,
  columnGroup,
  data,
  rotateHeader = false,
  border,
  columnHeaderHeight,
  showMenuOnLocation = false,
  hideTopRightBorder,
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
      hideTopRightBorder={hideTopRightBorder}
    />
  );
};
