import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';
import { createIntl, createIntlCache } from 'react-intl';

import { loadLocaleData } from 'providers';
import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const SocialSectorAffectedColumns = (language: string): GridColDef[] => {
  // This is optional but highly recommended
  // since it prevents memory leak
  const cache = createIntlCache();

  const intl = createIntl(
    {
      locale: language,
      messages: loadLocaleData(language),
    },
    cache,
  );

  return [
    getColumnSetup(DroughtSpecific.NumSchNoHo2, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.BotSourTang, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.HSourNoTang, DROUGHT),
    getColumnSetup(DroughtSpecific.NoSourHtang, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NoBtSourTan, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.Electric, DROUGHT, 70, {
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
      language,
    }),
    getColumnSetup(DroughtSpecific.HealCenNoHo2, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.HBotSourTang, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.HaSouNoTang, DROUGHT),
    getColumnSetup(DroughtSpecific.NoSourHatan, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NoBtSouTan, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.ElecForHeal, DROUGHT, 70, {
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
      language,
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
