import { FloodDto } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { formatFloodFields } from 'utils/formatRawToForm';

export const FloodReport = ({ forms }: { forms: FloodDto[] }) => {
  const formattedForms = useMemo(
    () => forms.map(form => formatFloodFields(form)),
    [forms],
  );

  return <div>{JSON.stringify(formattedForms)}</div>;
};
