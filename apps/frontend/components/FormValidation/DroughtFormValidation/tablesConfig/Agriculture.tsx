import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const AgricultureColumns: GridColDef[] = [
  getColumnSetup({
    field: DroughtSpecific.FamAgriAff,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({
    field: DroughtSpecific.FarmAff,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({ field: DroughtSpecific.FarmDam, disaster: DROUGHT }),
  getColumnSetup({
    field: DroughtSpecific.SamNabAff,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({ field: DroughtSpecific.SamNabDam, disaster: DROUGHT }),
  getColumnSetup({
    field: DroughtSpecific.PaddyAff,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({ field: DroughtSpecific.PaddyDam, disaster: DROUGHT }),
  getColumnSetup({
    field: DroughtSpecific.CowDeath,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({ field: DroughtSpecific.BaffoDeath, disaster: DROUGHT }),
  getColumnSetup({
    field: DroughtSpecific.PigDeath,
    disaster: DROUGHT,
    width: 70,
  }),
  getColumnSetup({
    field: DroughtSpecific.BirdDeath,
    disaster: DROUGHT,
    width: 70,
  }),
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
