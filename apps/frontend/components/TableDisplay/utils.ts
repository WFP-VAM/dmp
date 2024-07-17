import { DisasterDtoType, formatCommonFields } from '@wfp-dmp/interfaces';
import { orderBy } from 'lodash';

import { dropNotApproved } from 'utils/dropNotApproved';

export type BasicFloodForm = {
  id: string;
  province: string;
};

export const formatForms = (
  forms: DisasterDtoType[] | undefined,
  dropRejected: boolean,
) => {
  if (forms === undefined || forms.length === 0) {
    return [];
  }

  // Filter out rejected forms and order by date descending
  // using disasterDate then submissionTime.
  const formattedForms = (dropRejected ? dropNotApproved(forms) : forms).map(
    form => {
      return formatCommonFields(form);
    },
  );

  return orderBy(
    formattedForms,
    ['disasterDate', 'submissionTime'],
    ['desc', 'desc'],
  );
};
