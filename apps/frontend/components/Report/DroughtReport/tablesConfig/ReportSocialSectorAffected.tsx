import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const ReportSocialSectorAffectedColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.NumSchNoHo2, DROUGHT, 98),
  getColumnSetup(DroughtSpecific.BotSourTang, DROUGHT, 98),
  getColumnSetup(DroughtSpecific.HSourNoTang, DROUGHT, 80),
  getColumnSetup(DroughtSpecific.NoSourHtang, DROUGHT, 80),
  getColumnSetup(DroughtSpecific.NoBtSourTan, DROUGHT, 80),
  getColumnSetup(DroughtSpecific.Electric + '_1', DROUGHT, 65),
  getColumnSetup(DroughtSpecific.Electric + '_2', DROUGHT, 65),
  getColumnSetup(DroughtSpecific.HealCenNoHo2, DROUGHT, 105),
  getColumnSetup(DroughtSpecific.HBotSourTang, DROUGHT, 100),
  getColumnSetup(DroughtSpecific.HaSouNoTang, DROUGHT, 80),
  getColumnSetup(DroughtSpecific.NoSourHatan, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.NoBtSouTan, DROUGHT, 75),
  getColumnSetup(DroughtSpecific.ElecForHeal + '_1', DROUGHT, 65),
  getColumnSetup(DroughtSpecific.ElecForHeal + '_2', DROUGHT, 65),
];

const ReportSocialSectorAffectedColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('socialSectorAffected', DROUGHT),
    children: [
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
    ],
  },
];

export const ReportSocialSectorAffectedColumnSettings = {
  columns: ReportSocialSectorAffectedColumns,
  columnGroup: ReportSocialSectorAffectedColumnGroup,
};
