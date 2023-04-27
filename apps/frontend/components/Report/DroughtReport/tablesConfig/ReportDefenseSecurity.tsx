import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const ReportDefenseSecurityColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.NuKidColWat + '_1', DROUGHT),
  getColumnSetup(DroughtSpecific.NuKidColWat + '_2', DROUGHT),
  getColumnSetup(DroughtSpecific.IfYes + '_1', DROUGHT, 60),
  getColumnSetup(DroughtSpecific.IfYes + '_2', DROUGHT, 60),
  getColumnSetup(DroughtSpecific.NuWoCollWat + '_1', DROUGHT),
  getColumnSetup(DroughtSpecific.NuWoCollWat + '_2', DROUGHT),
  getColumnSetup(DroughtSpecific.Yes + '_1', DROUGHT, 60),
  getColumnSetup(DroughtSpecific.Yes + '_2', DROUGHT, 60),
  getColumnSetup(DroughtSpecific.TreatOccur + '_1', DROUGHT),
  getColumnSetup(DroughtSpecific.TreatOccur + '_2', DROUGHT),
];

const ReportDefenseSecurityColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('defenseSecurity', DROUGHT),
    children: [
      {
        ...getGroupSetup('reportKidColWater', DROUGHT),
        children: [
          { field: DroughtSpecific.NuKidColWat + '_1' },
          { field: DroughtSpecific.NuKidColWat + '_2' },
        ],
      },
      {
        ...getGroupSetup('reportKidColWaterIncrease', DROUGHT),
        children: [
          { field: DroughtSpecific.IfYes + '_1' },
          { field: DroughtSpecific.IfYes + '_2' },
        ],
      },
      {
        ...getGroupSetup('reportWomenColWater', DROUGHT),
        children: [
          { field: DroughtSpecific.NuWoCollWat + '_1' },
          { field: DroughtSpecific.NuWoCollWat + '_2' },
        ],
      },
      {
        ...getGroupSetup('reportWomenColWaterIncrease', DROUGHT),
        children: [
          { field: DroughtSpecific.Yes + '_1' },
          { field: DroughtSpecific.Yes + '_2' },
        ],
      },
      {
        ...getGroupSetup('reportThreat', DROUGHT),
        children: [
          { field: DroughtSpecific.TreatOccur + '_1' },
          { field: DroughtSpecific.TreatOccur + '_2' },
        ],
      },
    ],
  },
];

export const ReportDefenseSecurityColumnSettings = {
  columns: ReportDefenseSecurityColumns,
  columnGroup: ReportDefenseSecurityColumnGroup,
};
