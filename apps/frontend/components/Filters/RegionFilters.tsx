import LocationOnIcon from '@mui/icons-material/FmdGoodOutlined';
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
} from '@mui/material';
import { communes, districts, provinces } from '@wfp-dmp/interfaces';
import { useAuth } from 'context/auth';
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

export interface Region {
  province: string[];
  district: string[];
  commune: string[];
  disabled?: boolean;
}

interface Props {
  value: Region;
  onChange: (regionValues: Region) => void;
  disableAll?: boolean;
}

export const RegionFilters = ({
  value,
  onChange,
  disableAll,
}: Props): JSX.Element => {
  const { user } = useAuth();
  const allowedProvinces = useMemo(() => {
    if (user === undefined) {
      return [];
    }
    if (['admin', 'ncdm'].includes(user.roles[0])) {
      return provinces;
    } else if (user.province === undefined) {
      console.log('Error! User must have a province');

      return provinces;
    } else {
      return [user.province];
    }
  }, [user]);

  const districtsFiltered = useMemo(
    () =>
      value.province
        ? Array.prototype.concat(
            ...value.province.map(pro => getDistrictsFilteredByProvince(pro)),
          )
        : [],
    [value.province],
  );

  const communesFiltered = useMemo(
    () => getCommunesFilteredByDistrict(value.district[0]),
    [value.district],
  );

  const selectInputStyles = {
    mr: 2,
    minWidth: 200,
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 600,
  };

  console.log({ value });

  return (
    <Box display="flex" flexDirection="row" justifyContent="left" margin={1}>
      <FormControl>
        <Select
          multiple
          disabled={disableAll === true || user === undefined ? true : false}
          value={value.province || []} // Ensure value is an array
          onChange={e => {
            onChange({
              ...value,
              province: e.target.value as string[],
              district: [],
              commune: [],
            });
          }}
          sx={selectInputStyles}
          displayEmpty
          startAdornment={
            <InputAdornment position="start">
              <LocationOnIcon sx={{ color: 'black' }} />
            </InputAdornment>
          }
        >
          <MenuItem value={[]} key={'validation_search_params.all-province'}>
            <FormattedMessage id="validation_search_params.all-province" />
          </MenuItem>
          {allowedProvinces.map(provinceNumber => {
            return (
              <MenuItem value={provinceNumber} key={provinceNumber}>
                <FormattedMessage id={`province.${provinceNumber}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
        <Select
          multiple
          disabled={disableAll === true || value.province.length === 0}
          value={value.district || []} // Ensure value is an array
          onChange={e => {
            onChange({
              ...value,
              district: e.target.value as string[],
              commune: [],
            });
          }}
          sx={selectInputStyles}
          displayEmpty
          startAdornment={
            <InputAdornment position="start">
              <LocationOnIcon sx={{ color: 'black' }} />
            </InputAdornment>
          }
        >
          <MenuItem value={[]}>
            <FormattedMessage id="validation_search_params.all-district" />
          </MenuItem>
          {districtsFiltered.map(districtNumber => {
            return (
              <MenuItem value={districtNumber} key={districtNumber}>
                <FormattedMessage id={`district.${districtNumber}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
        <Select
          multiple
          disabled={disableAll === true || value.district.length === 0}
          value={value.commune || []} // Ensure value is an array
          onChange={e => {
            onChange({ ...value, commune: e.target.value as string[] });
          }}
          sx={selectInputStyles}
          displayEmpty
          startAdornment={
            <InputAdornment position="start">
              <LocationOnIcon sx={{ color: 'black' }} />
            </InputAdornment>
          }
        >
          <MenuItem value={[]}>
            <FormattedMessage id="validation_search_params.all-commune" />
          </MenuItem>
          {communesFiltered.map(communeNumber => {
            return (
              <MenuItem value={communeNumber} key={communeNumber}>
                <FormattedMessage id={`commune.${communeNumber}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
