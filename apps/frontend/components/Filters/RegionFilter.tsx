import { InputLabel, MenuItem, Select } from '@mui/material';
import { provinces } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

export const RegionFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: () => void;
}): JSX.Element => {
  return (
    <>
      <InputLabel>Province</InputLabel>
      <Select value={value} onChange={onChange}>
        {provinces.map(provinceNumber => {
          return (
            <MenuItem value={provinceNumber} key={provinceNumber}>
              <FormattedMessage id={`provinces.${provinceNumber}`} />
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
