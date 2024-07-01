import { Box, FormControl, MenuItem, Select } from '@mui/material';
import { communes, districts, provinces } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAuth } from 'context/auth';

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
  province: string;
  district: string;
  commune: string;
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
    () => getDistrictsFilteredByProvince(value.province),
    [value.province],
  );

  const communesFiltered = useMemo(
    () => getCommunesFilteredByDistrict(value.district),
    [value.district],
  );

  const selectInputStyles = { mr: 3, minWidth: 200 };

  return (
    <Box display="flex" flexDirection="row" justifyContent="left" margin={2}>
      <FormControl>
        <Select
          disabled={disableAll === true || user === undefined ? true : false}
          value={value.province}
          onChange={e => {
            onChange({ province: e.target.value, district: '', commune: '' });
          }}
          sx={selectInputStyles}
          displayEmpty
        >
          <MenuItem value="" key={'validation_search_params.all-province'}>
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
          disabled={disableAll === true || value.province === ''}
          value={value.district}
          onChange={e => {
            onChange({ ...value, district: e.target.value, commune: '' });
          }}
          sx={selectInputStyles}
          displayEmpty
        >
          <MenuItem value="">
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
          disabled={disableAll === true || value.district === ''}
          value={value.commune}
          onChange={e => {
            onChange({ ...value, commune: e.target.value });
          }}
          sx={selectInputStyles}
          displayEmpty
        >
          <MenuItem value="">
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
