import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { KoboFieldConstraintDto } from '@wfp-dmp/interfaces';

import {
  applyFieldConstraints,
  buildFieldBounds,
  getChangedFieldViolation,
  getConstraintViolations,
  parseNumericConstraint,
} from './koboConstraints';

describe('parseNumericConstraint', () => {
  it('returns no bounds when constraint is undefined', () => {
    expect(parseNumericConstraint(undefined)).toEqual({});
  });

  it('parses a >= lower bound', () => {
    expect(parseNumericConstraint('. >= 0')).toEqual({ min: 0 });
  });

  it('parses a > lower bound as an inclusive min one above the value', () => {
    expect(parseNumericConstraint('. > 0')).toEqual({ min: 1 });
  });

  it('parses a <= upper bound', () => {
    expect(parseNumericConstraint('. <= 100')).toEqual({ max: 100 });
  });

  it('parses a combined lower and upper bound', () => {
    expect(parseNumericConstraint('. >= 0 and . <= 100')).toEqual({
      min: 0,
      max: 100,
    });
  });
});

const specificKeys = {
  NumVillAff: 'g3/g3_1/NumVillAff',
  NumFamAff: 'g3/g3_1/g3_2/NumFamAff',
};

describe('buildFieldBounds', () => {
  it('returns an empty map when there are no constraints', () => {
    expect(buildFieldBounds(undefined, specificKeys).size).toBe(0);
    expect(buildFieldBounds([], specificKeys).size).toBe(0);
  });

  it('ignores constraints with no field match and no parseable bounds', () => {
    const constraints: KoboFieldConstraintDto[] = [
      { path: 'some/other/path', constraint: '. >= 0' },
      { path: 'g3/g3_1/NumVillAff', constraint: 'regex(., "^[0-9]+$")' },
    ];

    expect(buildFieldBounds(constraints, specificKeys).size).toBe(0);
  });

  it('maps a DMP field key to its parsed bounds and message', () => {
    const constraints: KoboFieldConstraintDto[] = [
      {
        path: 'g3/g3_1/NumVillAff',
        constraint: '. >= 0',
        constraintMessage: 'please enter value >= 0',
      },
    ];

    expect(
      buildFieldBounds(constraints, specificKeys).get('NumVillAff'),
    ).toEqual({
      min: 0,
      max: undefined,
      message: 'please enter value >= 0',
    });
  });
});

describe('applyFieldConstraints', () => {
  const columns: GridColDef[] = [
    { field: 'NumVillAff' },
    { field: 'NumFamAff' },
  ];

  it('returns columns unchanged when there are no constraints', () => {
    expect(applyFieldConstraints(columns, undefined, specificKeys)).toBe(
      columns,
    );
    expect(applyFieldConstraints(columns, [], specificKeys)).toBe(columns);
  });

  it('leaves a column without a matching constraint untouched', () => {
    const constraints: KoboFieldConstraintDto[] = [
      { path: 'some/other/path', constraint: '. >= 0' },
    ];

    const result = applyFieldConstraints(columns, constraints, specificKeys);

    expect(result[0].cellClassName).toBeUndefined();
    expect(result[1].cellClassName).toBeUndefined();
  });

  it('flags an out-of-bounds cell value via cellClassName', () => {
    const constraints: KoboFieldConstraintDto[] = [
      { path: 'g3/g3_1/NumVillAff', constraint: '. >= 0' },
    ];

    const [villColumn] = applyFieldConstraints(
      columns,
      constraints,
      specificKeys,
    );
    const cellClassName = villColumn.cellClassName as (
      params: GridCellParams,
    ) => string;

    expect(cellClassName({ value: -1 } as GridCellParams)).toBe(
      'kobo-constraint-invalid',
    );
    expect(cellClassName({ value: 5 } as GridCellParams)).toBe('');
  });
});

describe('getConstraintViolations', () => {
  it('returns no violations when there are no constraints', () => {
    expect(
      getConstraintViolations({ NumVillAff: '-1' }, undefined, specificKeys),
    ).toEqual([]);
  });

  it('reports a field whose value violates its bound', () => {
    const constraints: KoboFieldConstraintDto[] = [
      {
        path: 'g3/g3_1/NumVillAff',
        constraint: '. >= 0',
        constraintMessage: 'please enter value >= 0',
      },
    ];

    expect(
      getConstraintViolations({ NumVillAff: '-1' }, constraints, specificKeys),
    ).toEqual([{ field: 'NumVillAff', message: 'please enter value >= 0' }]);
  });

  it('does not report a field within bounds', () => {
    const constraints: KoboFieldConstraintDto[] = [
      { path: 'g3/g3_1/NumVillAff', constraint: '. >= 0' },
    ];

    expect(
      getConstraintViolations({ NumVillAff: '5' }, constraints, specificKeys),
    ).toEqual([]);
  });
});

describe('getChangedFieldViolation', () => {
  const boundsByField = buildFieldBounds(
    [
      {
        path: 'g3/g3_1/NumVillAff',
        constraint: '. >= 0',
        constraintMessage: 'please enter value >= 0',
      },
    ],
    specificKeys,
  );

  it('returns undefined when the field did not change', () => {
    expect(
      getChangedFieldViolation(
        { NumVillAff: '-1' },
        { NumVillAff: '-1' },
        boundsByField,
      ),
    ).toBeUndefined();
  });

  it('returns undefined when the changed value is within bounds', () => {
    expect(
      getChangedFieldViolation(
        { NumVillAff: '5' },
        { NumVillAff: '1' },
        boundsByField,
      ),
    ).toBeUndefined();
  });

  it('returns the violation for a field that changed to an out-of-bounds value', () => {
    expect(
      getChangedFieldViolation(
        { NumVillAff: '-1' },
        { NumVillAff: '1' },
        boundsByField,
      ),
    ).toEqual({ field: 'NumVillAff', message: 'please enter value >= 0' });
  });

  it('only reports the first violated field among several changed ones', () => {
    const multiFieldBounds = buildFieldBounds(
      [
        {
          path: 'g3/g3_1/NumVillAff',
          constraint: '. >= 0',
          constraintMessage: 'villages msg',
        },
        {
          path: 'g3/g3_1/g3_2/NumFamAff',
          constraint: '. >= 0',
          constraintMessage: 'families msg',
        },
      ],
      specificKeys,
    );

    expect(
      getChangedFieldViolation(
        { NumVillAff: '-1', NumFamAff: '-1' },
        { NumVillAff: '1', NumFamAff: '1' },
        multiFieldBounds,
      ),
    ).toEqual({ field: 'NumVillAff', message: 'villages msg' });
  });
});
