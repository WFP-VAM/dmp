import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { communes, districts, provinces } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

const selectInputStyles = { mr: 3, minWidth: 120 };

export const ProvinceFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: () => void;
}): JSX.Element => {
  return (
    <FormControl>
      <InputLabel>Province</InputLabel>
      <Select value={value} onChange={onChange} sx={selectInputStyles}>
        {provinces.map(provinceNumber => {
          return (
            <MenuItem value={provinceNumber} key={provinceNumber}>
              <FormattedMessage id={`provinces.${provinceNumber}`} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const singleProvinceDistricts = (provinceValue: string) => {
  return districts.filter((district: string) => {
    return district.startsWith(provinceValue);
  });
};
export const DistrictFilter = ({
  value,
  onChange,
  provinceValue,
}: {
  value: string;
  onChange: () => void;
  provinceValue: string;
}): JSX.Element => {
  const districtsFiltered = useMemo(
    () => singleProvinceDistricts(provinceValue),
    [provinceValue],
  );

  return (
    <FormControl disabled={provinceValue !== '' ? false : true}>
      <InputLabel>District</InputLabel>
      <Select value={value} onChange={onChange} sx={selectInputStyles}>
        {districtsFiltered.map(districtNumber => {
          return (
            <MenuItem value={districtNumber} key={districtNumber}>
              <FormattedMessage id={`districts.${districtNumber}`} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const singleDistrictCommunes = (districtValue: string) => {
  return communes.filter((commune: string) => {
    return commune.startsWith(districtValue);
  });
};
export const CommuneFilter = ({
  value,
  onChange,
  districtValue,
}: {
  value: string;
  onChange: () => void;
  districtValue: string;
}): JSX.Element => {
  const communesFiltered = useMemo(
    () => singleDistrictCommunes(districtValue),
    [districtValue],
  );

  return (
    <FormControl disabled={districtValue !== '' ? false : true}>
      <InputLabel>Commune</InputLabel>
      <Select value={value} onChange={onChange} sx={selectInputStyles}>
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
