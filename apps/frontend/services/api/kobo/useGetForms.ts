import { DroughtDto, FloodDto, IncidentDto } from '@wfp-dmp/interfaces';
import useSWR from 'swr';

import { SearchFormData } from 'components/Filters/SearchFilters';
import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

export const useGetForms = ({
  disTyp: inputDisTyp,
  region: inputRegion,
  dateRange: inputDateRange,
}: SearchFormData) => {
  const inputStartDate = inputDateRange.startDate.format('YYYY-MM-DD');
  const inputEndDate = inputDateRange.endDate.format('YYYY-MM-DD');
  const inputProvince =
    inputRegion.province === '' ? undefined : inputRegion.province;
  const inputDistrict =
    inputRegion.district === '' ? undefined : inputRegion.district;
  const inputCommune =
    inputRegion.commune === '' ? undefined : inputRegion.commune;

  const { data, isLoading } = useSWR(
    [
      ApiRoutes.forms,
      inputDisTyp,
      inputStartDate,
      inputEndDate,
      inputProvince,
      inputDistrict,
      inputCommune,
    ],
    async ([
      relativePath,
      disTyp,
      startDate,
      endDate,
      province,
      district,
      commune,
    ]) => {
      const { data: formsData } = await apiClient.get<
        FloodDto[] | DroughtDto[] | IncidentDto[] | []
      >(relativePath, {
        params: { disTyp, startDate, endDate, province, district, commune },
      });

      return formsData;
    },
  );

  return { data, isLoading };
};
