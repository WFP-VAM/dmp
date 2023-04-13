import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';
import { IntlShape } from 'react-intl';

import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const SocialSectorAffectedColumns = (intl: IntlShape): GridColDef[] => {
  return [
    getColumnSetup(DroughtSpecific.NumSchNoHo2, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.BotSourTang, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.HSourNoTang, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.NoSourHtang, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.NoBtSourTan, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.Electric, DROUGHT, 120, {
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
    }),
    getColumnSetup(DroughtSpecific.HealCenNoHo2, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.HBotSourTang, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.HaSouNoTang, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.NoSourHatan, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.NoBtSouTan, DROUGHT, 120),
    getColumnSetup(DroughtSpecific.ElecForHeal, DROUGHT, 120, {
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
    }),
  ];
};

export const SocialSectorAffectedColumnGroup: GridColumnGroupingModel = [
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
