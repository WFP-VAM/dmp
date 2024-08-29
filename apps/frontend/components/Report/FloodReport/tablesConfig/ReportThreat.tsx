import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { ColumnSetupParams, getColumnSetup } from 'utils/tableFormatting';

const colWidth = 8 * 9;
const width = colWidth + 8 * 2;

const ReportThreatColumns: GridColDef[] = [
  // This field is a multiple choice, the number 1, 2, ..., 14 are the possible values in Kobo.  They are counted separately in the report
  getColumnSetup({
    field: FloodSpecific.threat + '_1',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_2',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_3',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_4',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_5',
    disaster: FLOOD,
    width: width + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_6',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_7',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_8',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_9',
    disaster: FLOOD,
    width: width + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_10',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_11',
    disaster: FLOOD,
    width: width + 8 * 2,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_12',
    disaster: FLOOD,
    width: width + 8 * 3,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_13',
    disaster: FLOOD,
    width: width,
  }),
  getColumnSetup({
    field: FloodSpecific.threat + '_14',
    disaster: FLOOD,
    width: width,
  }),
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
