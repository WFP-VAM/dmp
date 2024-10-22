import {
  addProvinceLevelReportLocationColumns,
  AddProvinceLevelReportLocationColumnsParams,
} from 'utils/tableFormatting';

import { DisasterTable, DisasterTableProps } from './DisasterTable';

interface IProps {
  locationParams: AddProvinceLevelReportLocationColumnsParams;
  disasterTableParams: Pick<
    DisasterTableProps,
    'data' | 'variant' | 'columnHeaderHeight' | 'isFirstTable'
  >;
}

export const ProvinceLevelReportTable = ({
  locationParams,
  disasterTableParams,
}: IProps): JSX.Element => {
  const res = addProvinceLevelReportLocationColumns(locationParams);

  return (
    <DisasterTable
      columns={res.columns}
      columnGroup={res.columnGroup}
      isEditable={false}
      getRowId={(row: { province: string }) => row.province}
      {...disasterTableParams}
    />
  );
};
