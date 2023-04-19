import { FloodDto } from '@wfp-dmp/interfaces';

export const FloodReport = ({ forms }: { forms: FloodDto[] }) => {
  return <div>{JSON.stringify(forms)}</div>;
};
