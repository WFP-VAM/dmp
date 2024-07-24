import {
  addBriefReportLocationColumns,
  AddBriefReportLocationColumnsParams,
} from 'utils/tableFormatting';

import { DisasterTable, DisasterTableProps } from './DisasterTable';

interface IProps {
  locationParams: AddBriefReportLocationColumnsParams;
  disasterTableParams: Pick<
    DisasterTableProps,
    'data' | 'variant' | 'columnHeaderHeight'
  >;
}

export const BriefReportTable = ({
  locationParams,
  disasterTableParams,
}: IProps): JSX.Element => {
  const res = addBriefReportLocationColumns(locationParams);

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
