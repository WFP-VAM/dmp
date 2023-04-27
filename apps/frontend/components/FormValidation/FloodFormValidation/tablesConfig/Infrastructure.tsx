import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const InfrastructureColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.RubberRoAff, FLOOD, 90),
  getColumnSetup(FloodSpecific.RubberRoDam, FLOOD, 90),
  getColumnSetup(FloodSpecific.ConcretAff, FLOOD, 90),
  getColumnSetup(FloodSpecific.ConcretDam, FLOOD, 90),
  getColumnSetup(FloodSpecific.RuralRoAff, FLOOD, 90),
  getColumnSetup(FloodSpecific.RuralRoDam, FLOOD, 90),
  getColumnSetup(FloodSpecific.BridgeAff, FLOOD, 90),
  getColumnSetup(FloodSpecific.BridgeDam, FLOOD, 90),
  getColumnSetup(FloodSpecific.BeleBridAff, FLOOD, 90),
  getColumnSetup(FloodSpecific.BeleBridDam, FLOOD, 90),
  getColumnSetup(FloodSpecific.DrainageAff, FLOOD, 90),
  getColumnSetup(FloodSpecific.DrainageDam, FLOOD, 90),
];

const InfrastructureColumnGroup: GridColumnGroupingModel = [
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

export const InfrastructureColumnSettings = {
  columns: InfrastructureColumns,
  columnGroup: InfrastructureColumnGroup,
};
