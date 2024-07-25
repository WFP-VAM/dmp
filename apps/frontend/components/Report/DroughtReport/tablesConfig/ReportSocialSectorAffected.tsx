import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const ReportSocialSectorAffectedColumns: GridColDef[] = [
  getColumnSetup({
    field: DroughtSpecific.NumSchNoHo2,
    disaster: DROUGHT,
    width: 98,
  }),
  getColumnSetup({
    field: DroughtSpecific.BotSourTang,
    disaster: DROUGHT,
    width: 98,
  }),
  getColumnSetup({
    field: DroughtSpecific.HSourNoTang,
    disaster: DROUGHT,
    width: 80,
  }),
  getColumnSetup({
    field: DroughtSpecific.NoSourHtang,
    disaster: DROUGHT,
    width: 8 * 16,
  }),
  getColumnSetup({
    field: DroughtSpecific.NoBtSourTan,
    disaster: DROUGHT,
    width: 80,
  }),
  // This field is categorical, the number 1 and 2 are the possible values in Kobo. They are counted separately in the report
  getColumnSetup({
    field: DroughtSpecific.Electric + '_1',
    disaster: DROUGHT,
    width: 65,
  }),
  getColumnSetup({
    field: DroughtSpecific.Electric + '_2',
    disaster: DROUGHT,
    width: 65,
  }),
  getColumnSetup({
    field: DroughtSpecific.HealCenNoHo2,
    disaster: DROUGHT,
    width: 105,
  }),
  getColumnSetup({
    field: DroughtSpecific.HBotSourTang,
    disaster: DROUGHT,
    width: 100,
  }),
  getColumnSetup({
    field: DroughtSpecific.HaSouNoTang,
    disaster: DROUGHT,
    width: 80,
  }),
  getColumnSetup({
    field: DroughtSpecific.NoSourHatan,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({
    field: DroughtSpecific.NoBtSouTan,
    disaster: DROUGHT,
    width: 75,
  }),
  // This field is categorical, the number 1 and 2 are the possible values in Kobo. They are counted separately in the report
  getColumnSetup({
    field: DroughtSpecific.ElecForHeal + '_1',
    disaster: DROUGHT,
    width: 65,
  }),
  getColumnSetup({
    field: DroughtSpecific.ElecForHeal + '_2',
    disaster: DROUGHT,
    width: 65,
  }),
];

const ReportSocialSectorAffectedColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('schoolsNoWater', DROUGHT),
    children: [
      { field: DroughtSpecific.NumSchNoHo2 },
      { field: DroughtSpecific.BotSourTang },
      { field: DroughtSpecific.HSourNoTang },
      { field: DroughtSpecific.NoSourHtang },
      { field: DroughtSpecific.NoBtSourTan },
      {
        ...getGroupSetup('reportSchoolsElectric', DROUGHT),
        children: [
          { field: DroughtSpecific.Electric + '_1' },
          { field: DroughtSpecific.Electric + '_2' },
        ],
      },
    ],
  },
  {
    ...getGroupSetup('healthCentersNoWater', DROUGHT),
    children: [
      { field: DroughtSpecific.HealCenNoHo2 },
      { field: DroughtSpecific.HBotSourTang },
      { field: DroughtSpecific.HaSouNoTang },
      { field: DroughtSpecific.NoSourHatan },
      { field: DroughtSpecific.NoBtSouTan },
      {
        ...getGroupSetup('reportHealthElectric', DROUGHT),
        children: [
          { field: DroughtSpecific.ElecForHeal + '_1' },
          { field: DroughtSpecific.ElecForHeal + '_2' },
        ],
      },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'socialSectorAffected',
  disaster: DROUGHT,
  additionalChildren: [],
};

export const ReportSocialSectorAffectedColumnSettings = {
  columns: ReportSocialSectorAffectedColumns,
  columnGroup: ReportSocialSectorAffectedColumnGroup,
  groupParams,
};
