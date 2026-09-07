import {
  FLOOD,
  floodSpecificKeys,
  INCIDENT,
  incidentSpecificKeys,
  koboKeys,
} from '@wfp-dmp/interfaces';
import dayjs from 'dayjs';

import { FloodFormType } from 'components/FormValidation/FloodFormValidation/FloodFormType';
import { IncidentFormType } from 'components/FormValidation/IncidentFormValidation/IncidentFormType';
import { formatFormToRaw } from 'utils/formatFormToRaw';

describe('formatFormToRaw', () => {
  it('stringifies numeric DataGrid values and omits unmapped keys', () => {
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

    const raw = formatFormToRaw(formValues, koboKeys[FLOOD], floodSpecificKeys);

    expect(raw['g3/g3_1/g3_2/NumFamAff']).toBe('50');
    expect(raw['g2/flood_n']).toBe('3');
    expect(raw['g11/Crop/FarmAff']).toBe('31');
    expect(raw).not.toHaveProperty('g11/g11_1/FarmAff');
    expect(raw).not.toHaveProperty('undefined');
  });

  it('writes incident factory fields to current Kobo xpaths', () => {
    const incidentValues = {
      region: {
        province: ['05'],
        district: ['0503'],
        commune: ['050303'],
        village: 'village',
      },
      interviewer: 'tester',
      disTyp: '11',
      phone: '012',
      reportDate: dayjs('2024-01-02'),
      incidentDate: dayjs('2024-01-01'),
      specific: {
        FactoryAff: 7,
        FactoryDam: 4,
      },
    } as unknown as IncidentFormType;

    const raw = formatFormToRaw(
      incidentValues,
      koboKeys[INCIDENT],
      incidentSpecificKeys,
    );

    expect(raw['group_pk03i04/group_az7bv13/FactoryAff']).toBe('7');
    expect(raw['group_pk03i04/group_az7bv13/FactoryDam']).toBe('4');
    expect(raw).not.toHaveProperty('group_gh6ag70/group_az7bv13/FactoryAff');
  });
});
