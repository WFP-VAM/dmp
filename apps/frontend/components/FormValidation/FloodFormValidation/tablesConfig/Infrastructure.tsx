import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const InfrastructureColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.RubberRoAff, FLOOD, 100),
  getColumnSetup(FloodSpecific.RubberRoDam, FLOOD, 100),
  getColumnSetup(FloodSpecific.ConcretAff, FLOOD, 100),
  getColumnSetup(FloodSpecific.ConcretDam, FLOOD, 100),
  getColumnSetup(FloodSpecific.RuralRoAff, FLOOD, 100),
  getColumnSetup(FloodSpecific.RuralRoDam, FLOOD, 100),
  getColumnSetup(FloodSpecific.BridgeAff, FLOOD, 100),
  getColumnSetup(FloodSpecific.BridgeDam, FLOOD, 100),
  getColumnSetup(FloodSpecific.BeleBridAff, FLOOD, 100),
  getColumnSetup(FloodSpecific.BeleBridDam, FLOOD, 100),
  getColumnSetup(FloodSpecific.DrainageAff, FLOOD, 100),
  getColumnSetup(FloodSpecific.DrainageDam, FLOOD, 100),
];

export const InfrastructureColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('infrastructure', FLOOD),
    children: [
      {
        ...getGroupSetup('rubberRoad', FLOOD),
        children: [
          { field: FloodSpecific.RubberRoAff },
          { field: FloodSpecific.RubberRoDam },
        ],
      },
      {
        ...getGroupSetup('concretRoad', FLOOD),
        children: [
          { field: FloodSpecific.ConcretAff },
          { field: FloodSpecific.ConcretDam },
        ],
      },
      {
        ...getGroupSetup('ruralRoad', FLOOD),
        children: [
          { field: FloodSpecific.RuralRoAff },
          { field: FloodSpecific.RuralRoDam },
        ],
      },
      {
        ...getGroupSetup('bridge', FLOOD),
        children: [
          { field: FloodSpecific.BridgeAff },
          { field: FloodSpecific.BridgeDam },
        ],
      },
      {
        ...getGroupSetup('woodenBridge', FLOOD),
        children: [
          { field: FloodSpecific.BeleBridAff },
          { field: FloodSpecific.BeleBridDam },
        ],
      },
      {
        ...getGroupSetup('drainage', FLOOD),
        children: [
          { field: FloodSpecific.DrainageAff },
          { field: FloodSpecific.DrainageDam },
        ],
      },
    ],
  },
];
