import { flattenSurveyConstraints } from '../koboSurveyConstraints';

describe('flattenSurveyConstraints', () => {
  it('returns an empty array when survey is undefined', () => {
    expect(flattenSurveyConstraints(undefined)).toEqual([]);
  });

  it('ignores rows without a constraint', () => {
    const survey = [{ type: 'integer', name: 'NumVillAff' }];

    expect(flattenSurveyConstraints(survey)).toEqual([]);
  });

  it('flattens a constrained field nested in groups into its full submission path', () => {
    const survey = [
      { type: 'begin_group', name: 'g3' },
      { type: 'begin_group', name: 'g3_1' },
      {
        type: 'integer',
        name: 'NumVillAff',
        constraint: '. >= 0',
        constraint_message: 'please enter value >= 0',
      },
      { type: 'end_group' },
      { type: 'end_group' },
    ];

    expect(flattenSurveyConstraints(survey)).toEqual([
      {
        path: 'g3/g3_1/NumVillAff',
        constraint: '. >= 0',
        constraintMessage: 'please enter value >= 0',
      },
    ]);
  });

  it('pops the group stack back correctly for sibling groups', () => {
    const survey = [
      { type: 'begin_group', name: 'g3' },
      { type: 'integer', name: 'NumVillAff', constraint: '. >= 0' },
      { type: 'end_group' },
      { type: 'begin_group', name: 'g4' },
      { type: 'integer', name: 'NumTDeath', constraint: '. >= 0' },
      { type: 'end_group' },
    ];

    expect(flattenSurveyConstraints(survey)).toEqual([
      { path: 'g3/NumVillAff', constraint: '. >= 0', constraintMessage: undefined },
      { path: 'g4/NumTDeath', constraint: '. >= 0', constraintMessage: undefined },
    ]);
  });

  it('supports repeat groups the same way as groups', () => {
    const survey = [
      { type: 'begin_repeat', name: 'Crop' },
      { type: 'integer', name: 'FarmAff', constraint: '. >= 0' },
      { type: 'end_repeat' },
    ];

    expect(flattenSurveyConstraints(survey)).toEqual([
      { path: 'Crop/FarmAff', constraint: '. >= 0', constraintMessage: undefined },
    ]);
  });
});
