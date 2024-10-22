import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';
import { IntlShape } from 'react-intl';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

const SocialSectorAffectedColumns = (intl: IntlShape): GridColDef[] => {
  return [
    getColumnSetup({
      field: DroughtSpecific.NumSchNoHo2,
      disaster: DROUGHT,
      width: 100,
    }),
    getColumnSetup({
      field: DroughtSpecific.BotSourTang,
      disaster: DROUGHT,
      width: 150,
    }),
    getColumnSetup({
      field: DroughtSpecific.HSourNoTang,
      disaster: DROUGHT,
      width: 100,
    }),
    getColumnSetup({
      field: DroughtSpecific.NoSourHtang,
      disaster: DROUGHT,
      width: 100,
    }),
    getColumnSetup({
      field: DroughtSpecific.NoBtSourTan,
      disaster: DROUGHT,
      width: 100,
    }),
    getColumnSetup({
      field: DroughtSpecific.Electric,
      disaster: DROUGHT,
      width: 100,
      opts: {
        type: 'singleSelect',
        valueOptions: [
          {
            value: '1',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.elecPresent',
            }),
          },
          {
            value: '2',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.elecNotPresent',
            }),
          },
          { value: '', label: '' },
        ],
      },
    }),
    getColumnSetup({
      field: DroughtSpecific.HealCenNoHo2,
      disaster: DROUGHT,
      width: 120,
    }),
    getColumnSetup({
      field: DroughtSpecific.HBotSourTang,
      disaster: DROUGHT,
      width: 150,
    }),
    getColumnSetup({
      field: DroughtSpecific.HaSouNoTang,
      disaster: DROUGHT,
      width: 100,
    }),
    getColumnSetup({
      field: DroughtSpecific.NoSourHatan,
      disaster: DROUGHT,
      width: 100,
    }),
    getColumnSetup({
      field: DroughtSpecific.NoBtSouTan,
      disaster: DROUGHT,
      width: 100,
    }),
    getColumnSetup({
      field: DroughtSpecific.ElecForHeal,
      disaster: DROUGHT,
      width: 100,
      opts: {
        type: 'singleSelect',
        valueOptions: [
          {
            value: '1',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.elecPresent',
            }),
          },
          {
            value: '2',
            label: intl.formatMessage({
              id: 'table.DROUGHT.dropdowns.elecNotPresent',
            }),
          },
          { value: '', label: '' },
        ],
      },
    }),
  ];
};

const SocialSectorAffectedColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('socialSectorAffected', DROUGHT),
    children: [
      {
        ...getGroupSetup('schoolsNoWater', DROUGHT),
        children: [
          { field: DroughtSpecific.NumSchNoHo2 },
          { field: DroughtSpecific.BotSourTang },
          { field: DroughtSpecific.HSourNoTang },
          { field: DroughtSpecific.NoSourHtang },
          { field: DroughtSpecific.NoBtSourTan },
          { field: DroughtSpecific.Electric },
        ],
      },
      {
        ...getGroupSetup('healthCentersNoWater', DROUGHT),
        children: [
          { field: DroughtSpecific.HealCenNoHo2 },
          { field: DroughtSpecific.HBotSourTang },
          { field: DroughtSpecific.HaSouNoTang },
          { field: DroughtSpecific.NoSourHatan },
          { field: DroughtSpecific.NoBtSouTan },
          { field: DroughtSpecific.ElecForHeal },
        ],
      },
    ],
  },
];

export const getSocialSectorAffectedColumnSettings = (intl: IntlShape) => ({
  columns: SocialSectorAffectedColumns(intl),
  columnGroup: SocialSectorAffectedColumnGroup,
});
