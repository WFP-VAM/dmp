import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';
import { IntlShape } from 'react-intl';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const DefenseSecurityColumns = (intl: IntlShape): GridColDef[] => {
  return [
    getColumnSetup({
      field: DroughtSpecific.NuKidColWat,
      disaster: DROUGHT,
      width: 150,
      opts: {
        type: 'singleSelect',
        valueOptions: [
          {
            value: '1',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.yes',
            }),
          },
          {
            value: '2',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.no',
            }),
          },
          { value: '', label: '' },
        ],
      },
    }),
    getColumnSetup({
      field: DroughtSpecific.IfYes,
      disaster: DROUGHT,
      width: 120,
      opts: {
        type: 'singleSelect',
        valueOptions: [
          {
            value: '1',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.smallIncrease',
            }),
          },
          {
            value: '2',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.bigIncrease',
            }),
          },
          { value: '', label: '' },
        ],
      },
    }),
    getColumnSetup({
      field: DroughtSpecific.NuWoCollWat,
      disaster: DROUGHT,
      width: 150,
      opts: {
        type: 'singleSelect',
        valueOptions: [
          {
            value: '1',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.yes',
            }),
          },
          {
            value: '2',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.no',
            }),
          },
          { value: '', label: '' },
        ],
      },
    }),
    getColumnSetup({
      field: DroughtSpecific.Yes,
      disaster: DROUGHT,
      width: 120,
      opts: {
        type: 'singleSelect',
        valueOptions: [
          {
            value: '1',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.smallIncrease',
            }),
          },
          {
            value: '2',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.bigIncrease',
            }),
          },
          { value: '', label: '' },
        ],
      },
    }),
    getColumnSetup({
      field: DroughtSpecific.TreatOccur,
      disaster: DROUGHT,
      width: 120,
      opts: {
        type: 'singleSelect',
        valueOptions: [
          {
            value: '1',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.waterDispute',
            }),
          },
          {
            value: '2',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.sexualAbuse',
            }),
          },
          { value: '', label: '' },
        ],
      },
    }),
  ];
};

const DefenseSecurityColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('defenseSecurity', DROUGHT),
    children: [
      { field: DroughtSpecific.NuKidColWat },
      { field: DroughtSpecific.IfYes },
      { field: DroughtSpecific.NuWoCollWat },
      { field: DroughtSpecific.Yes },
      { field: DroughtSpecific.TreatOccur },
    ],
  },
];

export const getDefenseSecurityColumnSettings = (intl: IntlShape) => ({
  columns: DefenseSecurityColumns(intl),
  columnGroup: DefenseSecurityColumnGroup,
});
