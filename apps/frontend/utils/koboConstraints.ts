import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { KoboFieldConstraintDto } from '@wfp-dmp/interfaces';

export interface FieldBounds {
  min?: number;
  max?: number;
  message: string;
}

// Kobo/XLSForm numeric constraints are expressions like ". >= 0", ". <= 100", or a
// combination joined with "and" (e.g. ". >= 0 and . <= 100"). We only support the
// simple comparison-against-a-constant shape used across the DMP forms today; anything
// more elaborate (referencing other fields, regex, etc.) is left unenforced client-side.
const COMPARISON_PATTERN = /\.\s*(>=|<=|>|<)\s*(-?\d+(?:\.\d+)?)/g;

export const parseNumericConstraint = (
  constraint: string | undefined,
): Omit<FieldBounds, 'message'> => {
  if (constraint === undefined) {
    return {};
  }

  const bounds: Omit<FieldBounds, 'message'> = {};

  for (const match of Array.from(constraint.matchAll(COMPARISON_PATTERN))) {
    const [, operator, rawValue] = match;
    const value = Number(rawValue);

    switch (operator) {
      case '>=':
        bounds.min = value;
        break;
      case '>':
        bounds.min = value + 1;
        break;
      case '<=':
        bounds.max = value;
        break;
      case '<':
        bounds.max = value - 1;
        break;
    }
  }

  return bounds;
};

// Builds a lookup from DMP field key (e.g. 'NumVillAff') to its parsed numeric bounds,
// using the disaster-specific keys map (floodSpecificKeys, droughtSpecificKeys, ...)
// to translate DMP field keys into the full Kobo submission path used in `constraints`.
export const buildFieldBounds = (
  constraints: KoboFieldConstraintDto[] | undefined,
  specificKeys: Record<string, string>,
): Map<string, FieldBounds> => {
  const boundsByField = new Map<string, FieldBounds>();
  if (constraints === undefined || constraints.length === 0) {
    return boundsByField;
  }

  const constraintsByPath = new Map(constraints.map(c => [c.path, c]));

  for (const [field, koboPath] of Object.entries(specificKeys)) {
    const constraint = constraintsByPath.get(koboPath);
    if (constraint === undefined) {
      continue;
    }

    const { min, max } = parseNumericConstraint(constraint.constraint);
    if (min === undefined && max === undefined) {
      continue;
    }

    boundsByField.set(field, {
      min,
      max,
      message: constraint.constraintMessage ?? constraint.constraint,
    });
  }

  return boundsByField;
};

const isOutOfBounds = (value: unknown, bounds: FieldBounds): boolean => {
  const numericValue = Number(value);

  return (
    !Number.isNaN(numericValue) &&
    ((bounds.min !== undefined && numericValue < bounds.min) ||
      (bounds.max !== undefined && numericValue > bounds.max))
  );
};

// Highlights any cell whose current value violates its Kobo field's numeric constraint.
// This is computed straight from the cell's committed value on every render, so it
// reflects the real saved/displayed state as soon as an edit is committed (on blur/tab) -
// unlike GridColDef.preProcessEditCellProps, which only fires on live keystrokes and
// isn't a reliable place to block a save.
export const applyFieldConstraints = (
  columns: GridColDef[],
  constraints: KoboFieldConstraintDto[] | undefined,
  specificKeys: Record<string, string>,
): GridColDef[] => {
  const boundsByField = buildFieldBounds(constraints, specificKeys);
  if (boundsByField.size === 0) {
    return columns;
  }

  return columns.map(column => {
    const bounds = boundsByField.get(column.field);
    if (bounds === undefined) {
      return column;
    }

    return {
      ...column,
      cellClassName: (params: GridCellParams) =>
        isOutOfBounds(params.value, bounds) ? 'kobo-constraint-invalid' : '',
    };
  });
};

// Validates a full set of submitted field values against their Kobo constraints, so a
// value that violates a constraint (e.g. negative when '. >= 0' is required) can never
// actually be saved, regardless of whether the grid caught it live during editing.
export const getConstraintViolations = (
  values: Record<string, string | undefined>,
  constraints: KoboFieldConstraintDto[] | undefined,
  specificKeys: Record<string, string>,
): { field: string; message: string }[] => {
  const boundsByField = buildFieldBounds(constraints, specificKeys);
  const violations: { field: string; message: string }[] = [];

  for (const [field, bounds] of Array.from(boundsByField)) {
    if (isOutOfBounds(values[field], bounds)) {
      violations.push({ field, message: bounds.message });
    }
  }

  return violations;
};
