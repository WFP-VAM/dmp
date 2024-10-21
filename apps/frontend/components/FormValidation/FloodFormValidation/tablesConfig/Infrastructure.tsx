import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import {
  ColumnSetupParams,
  getColumnSetup,
  getGroupSetup,
} from 'utils/tableFormatting';

const InfrastructureColumns: GridColDef[] = [
  getColumnSetup({ field: FloodSpecific.RubberRoAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.RubberRoDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.ConcretAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.ConcretDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.RuralRoAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.RuralRoDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.BridgeAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.BridgeDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.BeleBridAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.BeleBridDam, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.DrainageAff, disaster: FLOOD }),
  getColumnSetup({ field: FloodSpecific.DrainageDam, disaster: FLOOD }),
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
