import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific, KoboCommonKeys } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const ReportDefenseSecurityColumns: GridColDef[] = [
  // Those fields are categorical, the number 1 and 2 are the possible values in Kobo.  They are counted separately in the report
  getColumnSetup(DroughtSpecific.NuKidColWat + '_1', DROUGHT),
  getColumnSetup(DroughtSpecific.NuKidColWat + '_2', DROUGHT),
  getColumnSetup(DroughtSpecific.IfYes + '_1', DROUGHT, 8 * 10),
  getColumnSetup(DroughtSpecific.IfYes + '_2', DROUGHT, 8 * 10),
  getColumnSetup(DroughtSpecific.NuWoCollWat + '_1', DROUGHT),
  getColumnSetup(DroughtSpecific.NuWoCollWat + '_2', DROUGHT),
  getColumnSetup(DroughtSpecific.Yes + '_1', DROUGHT, 8 * 10),
  getColumnSetup(DroughtSpecific.Yes + '_2', DROUGHT, 8 * 10),
  getColumnSetup(DroughtSpecific.TreatOccur + '_1', DROUGHT, 8 * 12),
  getColumnSetup(DroughtSpecific.TreatOccur + '_2', DROUGHT, 8 * 12),
];

const ReportDefenseSecurityColumnGroup = (
  detailed: boolean,
): GridColumnGroupingModel => [
  {
    ...getGroupSetup('defenseSecurity', DROUGHT, true),
    children: [
      ...(detailed
        ? [{ field: KoboCommonKeys.location }]
        : [
            { field: KoboCommonKeys.province },
            { field: KoboCommonKeys.district },
            { field: KoboCommonKeys.commune },
          ]),
    ],
  },
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

export const ReportDefenseSecurityColumnSettings = {
  columns: ReportDefenseSecurityColumns,
  columnGroup: ReportDefenseSecurityColumnGroup,
};
