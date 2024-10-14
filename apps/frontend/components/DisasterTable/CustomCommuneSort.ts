/* eslint-disable complexity */
import {
  GridSortCellParams,
  gridStringOrNumberComparator,
} from '@mui/x-data-grid';

export const getLocationIds = (id: string) => {
  return {
    provinceId: id.slice(0, 2),
    districtId: id.slice(0, 4),
    isProvince: id.length === 2,
    isDistrict: id.length === 4,
  };
};

export interface ExtendedGridSortCellParams extends GridSortCellParams {
  id: string;
  field: string;
  value: string | number | undefined;
}

export const findParentData = (
  data: Record<string, string | number | undefined>[],
  row: ExtendedGridSortCellParams,
): {
  provinceData: number | undefined;
  districtData: number | undefined;
  isProvince: boolean;
  isDistrict: boolean;
} => {
  const { provinceId, districtId, isProvince, isDistrict } = getLocationIds(
    row.id,
  );
  const provinceData = data.find(
    x => x.province === provinceId && x.district === undefined,
  )?.[row.field] as number | undefined;
  const districtData = data.find(
    x => x.district === districtId && x.commune === undefined,
  )?.[row.field] as number | undefined;

  return { provinceData, districtData, isProvince, isDistrict };
};

const isNumber = (
  value: string | number | undefined,
): value is number | undefined =>
  typeof value === 'number' || value === undefined;

export const createCustomComparator =
  (summedData: Record<string, string | number | undefined>[]) =>
  (
    v1: number | undefined,
    v2: number | undefined,
    row1: ExtendedGridSortCellParams,
    row2: ExtendedGridSortCellParams,
  ) => {
    if (!isNumber(row1.value) || !isNumber(row2.value)) {
      return gridStringOrNumberComparator(v1, v2, row1, row2);
    }

    const parentData1 = findParentData(summedData, row1);
    const parentData2 = findParentData(summedData, row2);

    // Compare province data
    if (parentData1.provinceData !== parentData2.provinceData) {
      const result =
        (parentData2.provinceData ?? 0) - (parentData1.provinceData ?? 0);

      return result;
    }

    // Compare district data
    if (parentData1.districtData !== parentData2.districtData) {
      // Handle edge case for districtData
      if (parentData1.isProvince && !parentData2.isProvince) {
        return -1; // Province rows should come before non-province rows
      }
      if (!parentData1.isProvince && parentData2.isProvince) {
        return 1; // Non-province rows should come after province rows
      }

      return (parentData2.districtData ?? 0) - (parentData1.districtData ?? 0);
    }

    // Compare row values
    const result = (v2 ?? -Infinity) - (v1 ?? -Infinity);

    return result;
  };
