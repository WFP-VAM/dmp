import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { FLOOD, FloodSpecific } from '@wfp-dmp/interfaces';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const ReportThreatColumns: GridColDef[] = [
  // This field is a multiple choice, the number 1, 2, ..., 14 are the possible values in Kobo.  They are counted separately in the report
  getColumnSetup(FloodSpecific.threat + '_1', FLOOD, 80),
  getColumnSetup(FloodSpecific.threat + '_2', FLOOD, 65),
  getColumnSetup(FloodSpecific.threat + '_3', FLOOD, 90),
  getColumnSetup(FloodSpecific.threat + '_4', FLOOD, 75),
  getColumnSetup(FloodSpecific.threat + '_5', FLOOD, 100),
  getColumnSetup(FloodSpecific.threat + '_6', FLOOD, 100),
  getColumnSetup(FloodSpecific.threat + '_7', FLOOD, 70),
  getColumnSetup(FloodSpecific.threat + '_8', FLOOD, 70),
  getColumnSetup(FloodSpecific.threat + '_9', FLOOD, 70),
  getColumnSetup(FloodSpecific.threat + '_10', FLOOD, 80),
  getColumnSetup(FloodSpecific.threat + '_11', FLOOD, 110),
  getColumnSetup(FloodSpecific.threat + '_12', FLOOD, 110),
  getColumnSetup(FloodSpecific.threat + '_13', FLOOD, 110),
  getColumnSetup(FloodSpecific.threat + '_14', FLOOD, 60),
];

const ReportThreatColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('reportThreat', FLOOD),
    children: [
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
  },
];

export const ReportThreatColumnSettings = {
  columns: ReportThreatColumns,
  columnGroup: ReportThreatColumnGroup,
};
