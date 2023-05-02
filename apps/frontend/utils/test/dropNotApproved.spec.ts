import { FloodDto, ValidationStatusValue } from '@wfp-dmp/interfaces';

import { dropNotApproved } from 'utils/dropNotApproved';

describe('dropNotApproved', () => {
  it('should drop the non approved', () => {
    const input = [
      { _validation_status: {} },
      { _validation_status: { uid: ValidationStatusValue.approved } },
      { _validation_status: { uid: ValidationStatusValue.notApproved } },
      { _validation_status: { uid: ValidationStatusValue.onHold } },
    ] as FloodDto[];

    const expected = [
      { _validation_status: {} },
      { _validation_status: { uid: ValidationStatusValue.approved } },
      { _validation_status: { uid: ValidationStatusValue.onHold } },
    ] as FloodDto[];

    expect(dropNotApproved(input)).toEqual(expected);
  });
});
