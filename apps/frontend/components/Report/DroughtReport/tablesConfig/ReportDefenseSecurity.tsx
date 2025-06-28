import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const ReportDefenseSecurityColumns: GridColDef[] = [
  // Those fields are categorical, the number 1 and 2 are the possible values in Kobo.  They are counted separately in the report
  getColumnSetup({
    field: DroughtSpecific.NuKidColWat + '_1',
    disaster: DROUGHT,
  }),
  getColumnSetup({
    field: DroughtSpecific.NuKidColWat + '_2',
    disaster: DROUGHT,
  }),
  getColumnSetup({
    field: DroughtSpecific.IfYes + '_1',
    disaster: DROUGHT,
    width: 8 * 10,
  }),
  getColumnSetup({
    field: DroughtSpecific.IfYes + '_2',
    disaster: DROUGHT,
    width: 8 * 10,
  }),
  getColumnSetup({
    field: DroughtSpecific.NuWoCollWat + '_1',
    disaster: DROUGHT,
  }),
  getColumnSetup({
    field: DroughtSpecific.NuWoCollWat + '_2',
    disaster: DROUGHT,
  }),
  getColumnSetup({
    field: DroughtSpecific.Yes + '_1',
    disaster: DROUGHT,
    width: 8 * 10,
  }),
  getColumnSetup({
    field: DroughtSpecific.Yes + '_2',
    disaster: DROUGHT,
    width: 8 * 10,
  }),
  getColumnSetup({
    field: DroughtSpecific.TreatOccur + '_1',
    disaster: DROUGHT,
    width: 8 * 12,
  }),
  getColumnSetup({
    field: DroughtSpecific.TreatOccur + '_2',
    disaster: DROUGHT,
    width: 8 * 12,
  }),
];

const ReportDefenseSecurityColumnGroup: GridColumnGroupingModel = [
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
];

const groupParams: ColumnSetupParams = {
  groupId: 'defenseSecurity',
  disaster: DROUGHT,
  additionalChildren: [],
};

export const ReportDefenseSecurityColumnSettings = {
  columns: ReportDefenseSecurityColumns,
  columnGroup: ReportDefenseSecurityColumnGroup,
  groupParams,
};
