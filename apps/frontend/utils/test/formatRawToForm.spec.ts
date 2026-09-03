import { FloodDto, IncidentDto } from '@wfp-dmp/interfaces';

import { formatFloodFields, formatIncidentFields } from 'utils/formatRawToForm';

const baseFlood = {
  _id: 816716609,
  'formhub/uuid': 'uid',
  start: '2026-09-03T00:00:00.000Z',
  end: '2026-09-03T00:00:00.000Z',
  'g1/q_Enum': 'admin',
  'g1/q_Funtion': 'flood_admin',
  'g1/q_Phone': '12345678',
  'g1/Date_report': '2026-09-03',
  'g2/Province': '24',
  'g2/District': '2401',
  'g2/Commune': '240103',
  'g2/Date_Dis': '2026-09-03',
  'g2/DisTyp': '1',
  __version__: 'version',
  'meta/instanceID': 'uuid',
  _xform_id_string: 'ids',
  _uuid: 'uid',
  _attachments: [],
  _status: 'submitted_via_web',
  _geolocation: [null, null],
  _submission_time: '2026-09-03T08:00:00',
  _tags: [],
  _notes: [],
  _validation_status: {},
  _submitted_by: null,
} as FloodDto;

describe('formatFloodFields agriculture mapping', () => {
  it('maps current Kobo agriculture xpaths into review fields', () => {
    const formatted = formatFloodFields({
      ...baseFlood,
      'g11/ToNamAgriAff': '33',
      'g11/NumFarmCroAff': '32',
      'g11/Crop/FarmAff': '31',
      'g11/Crop/FarmDam': '30',
      'g11/NumFarmPaddyAff': '29',
      'g11/g11_2/SamNabAff': '28',
    } as FloodDto);

    expect(formatted.ToNamAgriAff).toBe('33');
    expect(formatted.NumFarmCroAff).toBe('32');
    expect(formatted.FarmAff).toBe('31');
    expect(formatted.FarmDam).toBe('30');
    expect(formatted.NumFarmPaddyAff).toBe('29');
    expect(formatted.SamNabAff).toBe('28');
  });
});

const baseIncident = {
  _id: 3,
  'formhub/uuid': 'uid',
  start: '2026-09-03T00:00:00.000Z',
  end: '2026-09-03T00:00:00.000Z',
  'G1/q_Enum': 'admin',
  'G1/q_Funtion': 'admin_incident',
  'G1/q_Phone': '12345678',
  'G1/Date_report': '2026-09-03',
  'G2/Province': '05',
  'G2/District': '0503',
  'G2/Commune': '050303',
  'G2/Date_Dis': '2026-09-03',
  'G2/DisTyp': '11',
  __version__: 'version',
  'meta/instanceID': 'uuid',
  _xform_id_string: 'ids',
  _uuid: 'uid',
  _attachments: [],
  _status: 'submitted_via_web',
  _geolocation: [null, null],
  _submission_time: '2026-09-03T08:00:00',
  _tags: [],
  _notes: [],
  _validation_status: {},
  _submitted_by: null,
} as IncidentDto;

describe('formatIncidentFields factory mapping', () => {
  it('maps current Kobo factory xpaths into review fields', () => {
    const formatted = formatIncidentFields({
      ...baseIncident,
      'group_pk03i04/group_az7bv13/FactoryAff': '7',
      'group_pk03i04/group_az7bv13/FactoryDam': '4',
      'group_gh6ag70/group_na4yi04/CropAff': '2',
    } as IncidentDto);

    expect(formatted.FactoryAff).toBe('7');
    expect(formatted.FactoryDam).toBe('4');
    expect(formatted.CropAff).toBe('2');
  });
});
