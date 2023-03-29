import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { communes, districts, provinces } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useGetMe } from 'services/api/user/useUser';

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
}

interface Props {
  value: Region;
  onChange: (regionValues: Region) => void;
}

export const RegionFilters = ({ value, onChange }: Props): JSX.Element => {
  const user = useGetMe();
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

  const intl = useIntl();
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
    <Box display="flex" flexDirection="row" justifyContent="center" margin={2}>
      <FormControl>
        <InputLabel>
          <FormattedMessage id="validation_search_params.province" />
        </InputLabel>
        <Select
          disabled={user === undefined ? true : false}
          value={value.province}
          onChange={e => {
            onChange({ province: e.target.value, district: '', commune: '' });
          }}
          sx={selectInputStyles}
          label={intl.formatMessage({
            id: 'validation_search_params.province',
          })}
        >
          {allowedProvinces.map(provinceNumber => {
            return (
              <MenuItem value={provinceNumber} key={provinceNumber}>
                <FormattedMessage id={`provinces.${provinceNumber}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>
          <FormattedMessage id="validation_search_params.district" />
        </InputLabel>
        <Select
          disabled={value.province === '' ? true : false}
          value={value.district}
          onChange={e => {
            onChange({ ...value, district: e.target.value, commune: '' });
          }}
          sx={selectInputStyles}
          label={intl.formatMessage({
            id: 'validation_search_params.district',
          })}
        >
          {districtsFiltered.map(districtNumber => {
            return (
              <MenuItem value={districtNumber} key={districtNumber}>
                <FormattedMessage id={`districts.${districtNumber}`} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>
          <FormattedMessage id="validation_search_params.commune" />
        </InputLabel>
        <Select
          disabled={value.district === '' ? true : false}
          value={value.commune}
          onChange={e => {
            onChange({ ...value, commune: e.target.value });
          }}
          sx={selectInputStyles}
          label={intl.formatMessage({
            id: 'validation_search_params.commune',
          })}
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
    </Box>
  );
};
