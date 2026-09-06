import LocationOnIcon from '@mui/icons-material/FmdGoodOutlined';
import { FormControl, InputAdornment, Stack, useTheme } from '@mui/material';
import { communes, districts, provinces } from '@wfp-dmp/interfaces';
import { useMemo } from 'react';

import { useAuth } from 'context/auth';
import villages from 'translations/villages.json';

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
const getVillagesFilteredByCommune = (communeValue: string[]) => {
  return Object.keys(villages.en).filter(village => {
    return communeValue.find(x => village.startsWith(x));
  });
};

export interface Region {
  province: string[];
  district: string[];
  commune: string[];
  village?: string[];
  disabled?: boolean;
}

interface Props {
  value: Region;
  onChange: (regionValues: Region) => void;
  disableAll?: boolean;
  disableMulti?: boolean;
}

export const RegionFilters = ({
  value,
  onChange,
  disableAll,
  disableMulti,
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

  const villagesFiltered = useMemo(
    () => getVillagesFilteredByCommune(value.commune),
    [value.commune],
  );

  const startAdornment = (
    <InputAdornment position="start">
      <LocationOnIcon
        sx={{
          color: disableMulti ?? false ? 'grey' : 'black',
          minWidth: '20px',
          marginLeft: -1,
          marginRight: -2,
        }}
      />
    </InputAdornment>
  );

  return (
    <Stack direction="row" flexWrap="wrap" gap={theme.spacing(1)}>
      <FormControl>
        <MultiSelect
          value={value.province}
          options={allowedProvinces}
          onChange={v => {
            onChange({ province: v, district: [], commune: [], village: [] });
          }}
          placeholder="common.province"
          allSelectedText="validation_search_params.all-province"
          formatPrefix="province"
          disableMulti={disableMulti}
          selectProps={{
            disabled: disableAll === true || user === undefined ? true : false,
            startAdornment,
          }}
        />
      </FormControl>

      <FormControl>
        <MultiSelect
          value={value.district}
          options={districtsFiltered}
          onChange={v => {
            onChange({ ...value, district: v, commune: [], village: [] });
          }}
          placeholder="common.district"
          allSelectedText="validation_search_params.all-district"
          formatPrefix="district"
          disableMulti={disableMulti}
          selectProps={{
            disabled: disableAll === true || value.province.length === 0,
            startAdornment,
          }}
        />
      </FormControl>

      <FormControl>
        <MultiSelect
          value={value.commune}
          options={communesFiltered}
          onChange={v => {
            onChange({
              ...value,
              commune: v,
              village: (value.village ?? []).filter(village =>
                v.some(commune => village.startsWith(commune)),
              ),
            });
          }}
          placeholder="common.commune"
          allSelectedText="validation_search_params.all-commune"
          formatPrefix="commune"
          disableMulti={disableMulti}
          selectProps={{
            disabled: disableAll === true || value.district.length === 0,
            startAdornment,
          }}
        />
      </FormControl>
      {value.village !== undefined && (
        <FormControl>
          <MultiSelect
            value={value.village}
            options={villagesFiltered}
            onChange={v => onChange({ ...value, village: v })}
            placeholder="common.village"
            allSelectedText="validation_search_params.all-village"
            formatPrefix="village"
            width={250}
            selectProps={{
              disabled: disableAll === true || value.commune.length === 0,
              startAdornment,
            }}
          />
        </FormControl>
      )}
    </Stack>
  );
};
