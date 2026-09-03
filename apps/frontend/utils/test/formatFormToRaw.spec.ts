import { FLOOD, floodSpecificKeys, koboKeys } from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';

import { FloodFormType } from 'components/FormValidation/FloodFormValidation/FloodFormType';
import { formatFormToRaw } from 'utils/formatFormToRaw';

describe('formatFormToRaw', () => {
  const formValues = {
    region: {
      province: ['01'],
      district: ['0102'],
      commune: ['010203'],
      village: 'village',
    },
    interviewer: 'tester',
    disTyp: '1',
    phone: '012',
    reportDate: dayjs('2024-01-02'),
    incidentDate: dayjs('2024-01-01'),
    specific: {
      NumFamAff: 50,
      floodN: '3',
      FarmAff: 31,
    },
  } as unknown as FloodFormType;

  it('stringifies numeric DataGrid values and omits unmapped keys', () => {
    const raw = formatFormToRaw(formValues, koboKeys[FLOOD], floodSpecificKeys);

    expect(raw['g3/g3_1/g3_2/NumFamAff']).toBe('50');
    expect(raw['g2/flood_n']).toBe('3');
    expect(raw['g11/Crop/FarmAff']).toBe('31');
    expect(raw).not.toHaveProperty('g11/g11_1/FarmAff');
    expect(raw).not.toHaveProperty('undefined');
  });
});
