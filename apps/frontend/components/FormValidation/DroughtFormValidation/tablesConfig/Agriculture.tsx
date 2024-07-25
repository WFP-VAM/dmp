import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const AgricultureColumns: GridColDef[] = [
  getColumnSetup(DroughtSpecific.FamAgriAff, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.FarmAff, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.FarmDam, DROUGHT),
  getColumnSetup(DroughtSpecific.SamNabAff, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.SamNabDam, DROUGHT),
  getColumnSetup(DroughtSpecific.PaddyAff, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.PaddyDam, DROUGHT),
  getColumnSetup(DroughtSpecific.CowDeath, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.BaffoDeath, DROUGHT),
  getColumnSetup(DroughtSpecific.PigDeath, DROUGHT, 70),
  getColumnSetup(DroughtSpecific.BirdDeath, DROUGHT, 70),
];

const AgricultureColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('plantation', DROUGHT),
    children: [
      { field: DroughtSpecific.FamAgriAff },
      {
        ...getGroupSetup('crops', DROUGHT),
        children: [
          { field: DroughtSpecific.FarmAff },
          { field: DroughtSpecific.FarmDam },
        ],
      },
      {
        ...getGroupSetup('transplanted', DROUGHT),
        children: [
          { field: DroughtSpecific.SamNabAff },
          { field: DroughtSpecific.SamNabDam },
        ],
      },
      {
        ...getGroupSetup('paddy', DROUGHT),
        children: [
          { field: DroughtSpecific.PaddyAff },
          { field: DroughtSpecific.PaddyDam },
        ],
      },
    ],
  },
  {
    ...getGroupSetup('livestock', DROUGHT),
    children: [
      { field: DroughtSpecific.CowDeath },
      { field: DroughtSpecific.BaffoDeath },
      { field: DroughtSpecific.PigDeath },
      { field: DroughtSpecific.BirdDeath },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'agriculture',
  disaster: DROUGHT,
  additionalChildren: [],
};

export const AgricultureColumnSettings = {
  columns: AgricultureColumns,
  columnGroup: AgricultureColumnGroup,
  groupParams,
};
