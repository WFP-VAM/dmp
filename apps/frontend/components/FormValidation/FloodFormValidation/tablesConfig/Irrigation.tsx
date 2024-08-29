import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const colWidth = 8 * 9;

const IrrigationColumns: GridColDef[] = [
  getColumnSetup({ field: FloodSpecific.DamAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.DamDamaged, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.WatGateAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.WatGateDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.PlumWelAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.PlumWelDam, disaster: FLOOD }),
  getColumnSetup({
    field: FloodSpecific.DigWellAff,
    disaster: FLOOD,
    width: colWidth + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.DigWellDam,
    disaster: FLOOD,
    width: colWidth + 8 * 2,
  }),
  getColumnSetup({ field: FloodSpecific.PondAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.PondDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.LatrineAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.LatrineDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.RiverBreak, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.RiverBreakLo, disaster: FLOOD }),
];

const IrrigationColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('dam', FLOOD),
    children: [
      { field: FloodSpecific.DamAff },
      { field: FloodSpecific.DamDamaged },
    ],
  },
  {
    ...getGroupSetup('waterGate', FLOOD),
    children: [
      { field: FloodSpecific.WatGateAff },
      { field: FloodSpecific.WatGateDam },
    ],
  },
  {
    ...getGroupSetup('PumpWell', FLOOD),
    children: [
      { field: FloodSpecific.PlumWelAff },
      { field: FloodSpecific.PlumWelDam },
    ],
  },
  {
    ...getGroupSetup('digWell', FLOOD),
    children: [
      { field: FloodSpecific.DigWellAff },
      { field: FloodSpecific.DigWellDam },
    ],
  },
  {
    ...getGroupSetup('pond', FLOOD),
    children: [
      { field: FloodSpecific.PondAff },
      { field: FloodSpecific.PondDam },
    ],
  },
  {
    ...getGroupSetup('latrine', FLOOD),
    children: [
      { field: FloodSpecific.LatrineAff },
      { field: FloodSpecific.LatrineDam },
    ],
  },
  {
    ...getGroupSetup('riverBank', FLOOD),
    children: [
      { field: FloodSpecific.RiverBreak },
      { field: FloodSpecific.RiverBreakLo },
    ],
  },
];

const groupParams: ColumnSetupParams = {
  groupId: 'irrigation',
  disaster: FLOOD,
  additionalChildren: [],
};

export const IrrigationColumnSettings = {
  columns: IrrigationColumns,
  columnGroup: IrrigationColumnGroup,
  groupParams,
};
