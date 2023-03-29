import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { communes, districts, provinces } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

const getDistrictsFilteredByProvince = (provinceValue: string) => {
  return districts.filter((district: string) => {
    return district.startsWith(provinceValue);
  });
};
const getCommunesFilteredByDistrict = (districtValue: string) => {
  return communes.filter((commune: string) => {
    return commune.startsWith(districtValue);
  });
};

interface Props {
  value: { province: string; district: string; commune: string };
  onChange: (regionValues: {
    province: string;
    district: string;
    commune: string;
  }) => void;
  provinceValue: string;
  districtValue: string;
}
const selectInputStyles = { mr: 3, minWidth: 150 };
export const RegionFilters = ({
  value,
  onChange,
  provinceValue,
  districtValue,
}: Props): JSX.Element => {
  const districtsFiltered = useMemo(
    () => getDistrictsFilteredByProvince(provinceValue),
    [provinceValue],
  );

  const communesFiltered = useMemo(
    () => getCommunesFilteredByDistrict(districtValue),
    [districtValue],
  );

  return (
    <FormControl>
      <InputLabel>Province</InputLabel>
      <Select
        value={value.province}
        onChange={e => {
          onChange({ province: e.target.value, district: '', commune: '' });
        }}
        sx={selectInputStyles}
      >
        {provinces.map(provinceNumber => {
          return (
            <MenuItem value={provinceNumber} key={provinceNumber}>
              <FormattedMessage id={`provinces.${provinceNumber}`} />
            </MenuItem>
          );
        })}
      </Select>

      <Select
        value={value.district}
        onChange={e => {
          onChange({ ...value, district: e.target.value, commune: '' });
        }}
        sx={selectInputStyles}
      >
        {districtsFiltered.map(districtNumber => {
          return (
            <MenuItem value={districtNumber} key={districtNumber}>
              <FormattedMessage id={`districts.${districtNumber}`} />
            </MenuItem>
          );
        })}
      </Select>
      <Select
        value={value.commune}
        onChange={e => {
          onChange({ ...value, commune: e.target.value });
        }}
        sx={selectInputStyles}
      >
        {communesFiltered.map(communeNumber => {
          return (
            <MenuItem value={communeNumber} key={communeNumber}>
              <FormattedMessage id={`communes.${communeNumber}`} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
