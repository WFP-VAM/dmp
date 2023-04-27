import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const IrrigationColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.DamAff, FLOOD),
  getColumnSetup(FloodSpecific.DamDamaged, FLOOD),
  getColumnSetup(FloodSpecific.WatGateAff, FLOOD),
  getColumnSetup(FloodSpecific.WatGateDam, FLOOD),
  getColumnSetup(FloodSpecific.PlumWelAff, FLOOD),
  getColumnSetup(FloodSpecific.PlumWelDam, FLOOD),
  getColumnSetup(FloodSpecific.DigWellAff, FLOOD),
  getColumnSetup(FloodSpecific.DigWellDam, FLOOD),
  getColumnSetup(FloodSpecific.PondAff, FLOOD),
  getColumnSetup(FloodSpecific.PondDam, FLOOD),
  getColumnSetup(FloodSpecific.LatrineAff, FLOOD),
  getColumnSetup(FloodSpecific.LatrineDam, FLOOD),
  getColumnSetup(FloodSpecific.RiverBreak, FLOOD),
  getColumnSetup(FloodSpecific.RiverBreakLo, FLOOD),
];

const IrrigationColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('irrigation', FLOOD),
    children: [
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
    ],
  },
];

export const IrrigationColumnSettings = {
  columns: IrrigationColumns,
  columnGroup: IrrigationColumnGroup,
};
