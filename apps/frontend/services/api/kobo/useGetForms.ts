import { DroughtDto, FloodDto, IncidentDto } from '@wfp-dmp/interfaces';
import { useEffect } from 'react';
import useSWR from 'swr';

import { SearchFormData } from 'components/Filters/SearchFilters';
import { ApiRoutes } from 'services/api/apiRoutes';
import { apiClient } from 'services/api/client';

export const useGetForms = ({
  disTyps: inputDisTyps,
  region: inputRegion,
  dateRange: inputDateRange,
}: SearchFormData) => {
  const inputStartDate = inputDateRange.startDate?.format('YYYY-MM-DD');
  const inputEndDate = inputDateRange.endDate?.format('YYYY-MM-DD');
  const inputProvince =
    inputRegion.province.length === 0 ? undefined : inputRegion.province;
  const inputDistrict =
    inputRegion.district.length === 0 ? undefined : inputRegion.district;
  const inputCommune =
    inputRegion.commune.length === 0 ? undefined : inputRegion.commune;

  const { data, isLoading, mutate } = useSWR(
    [
      ApiRoutes.forms,
      inputDisTyps,
      inputStartDate,
      inputEndDate,
      inputProvince,
      inputDistrict,
      inputCommune,
    ],
    async ([
      relativePath,
      disTyps,
      startDate,
      endDate,
      province,
      district,
      commune,
    ]) => {
      const { data: formsData } = await apiClient.get<
        FloodDto[] | DroughtDto[] | IncidentDto[] | []
      >(relativePath, {
        params: { disTyps, startDate, endDate, province, district, commune },
      });

      return formsData;
    },
  );

  // Trigger a revalidation when the localStorage changes,
  // suggesting form data has been updated.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'formDataTrigger') {
        void mutate(); // Trigger a revalidation
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [mutate]);

  return { data, isLoading };
};
