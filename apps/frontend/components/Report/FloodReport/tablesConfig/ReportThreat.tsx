import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { ColumnSetupParams, getColumnSetup } from 'utils/tableFormatting';

const colWidth = 8 * 9;
const width = colWidth + 8 * 2;

const ReportThreatColumns: GridColDef[] = [
  // This field is a multiple choice, the number 1, 2, ..., 14 are the possible values in Kobo.  They are counted separately in the report
  getColumnSetup(FloodSpecific.threat + '_1', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_2', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_3', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_4', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_5', FLOOD, width + 8 * 2),
  getColumnSetup(FloodSpecific.threat + '_6', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_7', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_8', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_9', FLOOD, width + 8 * 2),
  getColumnSetup(FloodSpecific.threat + '_10', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_11', FLOOD, width + 8 * 2),
  getColumnSetup(FloodSpecific.threat + '_12', FLOOD, width + 8 * 3),
  getColumnSetup(FloodSpecific.threat + '_13', FLOOD, width),
  getColumnSetup(FloodSpecific.threat + '_14', FLOOD, width),
];

const ReportThreatColumnGroup: GridColumnGroupingModel = [];

const groupParams: ColumnSetupParams = {
  groupId: 'reportThreat',
  disaster: FLOOD,
  additionalChildren: [
    { field: FloodSpecific.threat + '_1' },
    { field: FloodSpecific.threat + '_2' },
    { field: FloodSpecific.threat + '_3' },
    { field: FloodSpecific.threat + '_4' },
    { field: FloodSpecific.threat + '_5' },
    { field: FloodSpecific.threat + '_6' },
    { field: FloodSpecific.threat + '_7' },
    { field: FloodSpecific.threat + '_8' },
    { field: FloodSpecific.threat + '_9' },
    { field: FloodSpecific.threat + '_10' },
    { field: FloodSpecific.threat + '_11' },
    { field: FloodSpecific.threat + '_12' },
    { field: FloodSpecific.threat + '_13' },
    { field: FloodSpecific.threat + '_14' },
  ],
};

export const ReportThreatColumnSettings = {
  columns: ReportThreatColumns,
  columnGroup: ReportThreatColumnGroup,
  columnHeaderHeight: 'large',
  groupParams,
};
