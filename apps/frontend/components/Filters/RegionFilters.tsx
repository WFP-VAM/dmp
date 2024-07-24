import LocationOnIcon from '@mui/icons-material/FmdGoodOutlined';
import { FormControl, InputAdornment, Stack, useTheme } from '@mui/material';
import { communes, districts, provinces } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { useAuth } from 'context/auth';

import MultiSelect from './MultiSelect';

const getDistrictsFilteredByProvince = (provinceValue: string[]) => {
  return districts.filter((district: string) => {
    return provinceValue.find(x => district.startsWith(x));
  });
};
const getCommunesFilteredByDistrict = (districtValue: string[]) => {
  return communes.filter((commune: string) => {
    return districtValue.find(x => commune.startsWith(x));
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
  const theme = useTheme();
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

  return (
    <Stack direction="row" gap={theme.spacing(1)}>
      <FormControl>
        <MultiSelect
          options={allowedProvinces}
          onChange={v => {
            onChange({ province: v, district: [], commune: [] });
          }}
          placeholder="common.province"
          allSelectedText="validation_search_params.all-province"
          formatPrefix="province"
          selectProps={{
            disabled: disableAll === true || user === undefined ? true : false,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon
                  sx={{
                    color: 'black',
                    minWidth: '20px',
                    marginLeft: -1,
                    marginRight: -2,
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl>
        <MultiSelect
          options={districtsFiltered}
          onChange={v => {
            onChange({ ...value, district: v, commune: [] });
          }}
          placeholder="common.district"
          allSelectedText="validation_search_params.all-district"
          formatPrefix="district"
          selectProps={{
            disabled: disableAll === true || value.province.length === 0,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon
                  sx={{
                    color: 'black',
                    minWidth: '20px',
                    marginLeft: -1,
                    marginRight: -2,
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl>
        <MultiSelect
          options={communesFiltered}
          onChange={v => {
            onChange({ ...value, commune: v });
          }}
          placeholder="common.commune"
          allSelectedText="validation_search_params.all-commune"
          formatPrefix="commune"
          selectProps={{
            disabled: disableAll === true || value.district.length === 0,
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon
                  sx={{
                    color: 'black',
                    minWidth: '20px',
                    marginLeft: -1,
                    marginRight: -2,
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Stack>
  );
};
