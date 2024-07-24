import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const InfrastructureColumns: GridColDef[] = [
  getColumnSetup(FloodSpecific.RubberRoAff, FLOOD),
  getColumnSetup(FloodSpecific.RubberRoDam, FLOOD),
  getColumnSetup(FloodSpecific.ConcretAff, FLOOD),
  getColumnSetup(FloodSpecific.ConcretDam, FLOOD),
  getColumnSetup(FloodSpecific.RuralRoAff, FLOOD),
  getColumnSetup(FloodSpecific.RuralRoDam, FLOOD),
  getColumnSetup(FloodSpecific.BridgeAff, FLOOD),
  getColumnSetup(FloodSpecific.BridgeDam, FLOOD),
  getColumnSetup(FloodSpecific.BeleBridAff, FLOOD),
  getColumnSetup(FloodSpecific.BeleBridDam, FLOOD),
  getColumnSetup(FloodSpecific.DrainageAff, FLOOD),
  getColumnSetup(FloodSpecific.DrainageDam, FLOOD),
];

const InfrastructureColumnGroup: GridColumnGroupingModel = [
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
];

const groupParams: ColumnSetupParams = {
  groupId: 'infrastructure',
  disaster: FLOOD,
  additionalChildren: [],
};

export const InfrastructureColumnSettings = {
  columns: InfrastructureColumns,
  columnGroup: InfrastructureColumnGroup,
  groupParams,
};
