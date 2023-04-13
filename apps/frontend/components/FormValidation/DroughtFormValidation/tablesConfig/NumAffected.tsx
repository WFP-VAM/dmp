import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import { DROUGHT, DroughtSpecific } from '@wfp-dmp/interfaces';
import { createIntl, createIntlCache } from 'react-intl';

import { loadLocaleData } from 'providers';
import { getColumnSetup, getGroupSetup } from 'utils/tableFormatting';

export const NumAffectedColumns = (language: string): GridColDef[] => {
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
    getColumnSetup(DroughtSpecific.NumVillAff, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumFamAff, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumPeoAff, DROUGHT),
    getColumnSetup(DroughtSpecific.NumMe, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumFe, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumKid, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumOld, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumDisMising, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.TNumDeath, DROUGHT),
    getColumnSetup(DroughtSpecific.NumMeDeath, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumFeDeath, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumKidDeath, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumOldDeath, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.NumDisDeath, DROUGHT, 70),
    getColumnSetup(DroughtSpecific.ElecForHeal, DROUGHT, 300, {
      type: 'singleSelect',
      valueOptions: [
        { value: '1', label: intl.formatMessage({ id: 'login.title' }) },
        { value: '2', label: intl.formatMessage({ id: 'login.error' }) },
        { value: '', label: '' },
      ],
      language,
    }),
  ];
};

export const NumAffectedColumnGroup: GridColumnGroupingModel = [
  {
    ...getGroupSetup('victimsAffected', DROUGHT),
    children: [
      { field: DroughtSpecific.NumVillAff },
      {
        ...getGroupSetup('noWater', DROUGHT),
        children: [
          { field: DroughtSpecific.NumFamAff },
          { field: DroughtSpecific.NumPeoAff },
          { field: DroughtSpecific.NumMe },
          { field: DroughtSpecific.NumFe },
          { field: DroughtSpecific.NumKid },
          { field: DroughtSpecific.NumOld },
          { field: DroughtSpecific.NumDisMising },
        ],
      },
      {
        ...getGroupSetup('deathToll', DROUGHT),
        children: [
          { field: DroughtSpecific.TNumDeath },
          { field: DroughtSpecific.NumMeDeath },
          { field: DroughtSpecific.NumFeDeath },
          { field: DroughtSpecific.NumKidDeath },
          { field: DroughtSpecific.NumOldDeath },
          { field: DroughtSpecific.NumDisDeath },
        ],
      },
      { field: DroughtSpecific.ElecForHeal },
    ],
  },
];
