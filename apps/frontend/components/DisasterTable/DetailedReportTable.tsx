import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import React from 'react';

import { addDetailedReportLocationColumns } from 'utils/tableFormatting';

import { DisasterTable } from './DisasterTable';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  rotateHeader?: boolean;
  border?: boolean;
}

const getLocationIds = (id: string) => {
  return {
    provinceId: id.slice(0, 2),
    districtId: id.slice(0, 4),
  };
};

type RawRow = { id: string; value: string | number | undefined; field: string };

const findParentData = (
  data: Record<string, string | number | undefined>[],
  row: RawRow,
) => {
  const { provinceId, districtId } = getLocationIds(row.id);
  console.log({ districtId });
  const provinceData = data.find(
    x => x.province === provinceId && x.district === undefined,
  )?.[row.field];
  const districtData = data.find(
    x => x.district === districtId && x.commune === undefined,
  )?.[row.field];

  return { provinceData, districtData };
};

export const DetailedReportTable = ({
  columns,
  columnGroup,
  data,
  rotateHeader = false,
  border,
}: IProps): JSX.Element => {
  const summedData = React.useMemo(() => {
    const districtMap = new Map<string, typeof data>();
    data.forEach(x => {
      const key = String(x.district);
      const val = districtMap.get(key) ?? [];
      districtMap.set(key, [...val, x]);
    });
    const groupedByCommune = Array.from(districtMap.values());
    const districtsSummed = groupedByCommune.map(arr => {
      const [head, ...rest] = arr;
      const acc = { ...head, commune: undefined } as Record<
        string,
        string | number | undefined
      >;
      const keys = Object.keys(acc);
      rest.forEach(x => {
        keys.forEach(k => {
          const accNumber = typeof acc[k] === 'number';
          const xNumber = typeof x[k] === 'number';
          if (accNumber || xNumber) {
            // @ts-expect-error acc[k] can't be undefined since we check if it is a number above
            if (accNumber && xNumber) acc[k] += x[k];
            if (!accNumber && xNumber) acc[k] = x[k];
          }
        });
      });

      return [acc, ...arr];
    });

    const provinceMap = new Map<string, typeof districtsSummed>();
    districtsSummed.forEach(x => {
      const key = String(x[0].province);
      const val = provinceMap.get(key) ?? [];
      provinceMap.set(key, [...val, x]);
    });
    const groupedByDistrict = Array.from(provinceMap.values());
    const provincesSummed = groupedByDistrict.map(arr => {
      const [head, ...rest] = arr;
      const acc = { ...head[0], district: undefined } as Record<
        string,
        string | number | undefined
      >;
      const keys = Object.keys(acc);
      rest.forEach(x => {
        const first = x[0]; // the sum of the communes are here
        keys.forEach(k => {
          const accNumber = typeof acc[k] === 'number';
          const xNumber = typeof first[k] === 'number';
          if (accNumber || xNumber) {
            // @ts-expect-error acc[k] can't be undefined since we check if it is a number above
            if (accNumber && xNumber) acc[k] += first[k];
            if (!accNumber && xNumber) acc[k] = first[k];
          }
        });
      });

      return [acc, ...arr];
    });

    return provincesSummed.flat().flat();
  }, [data]);

  // Custom comparator function
  const customComparator = (
    v1: number,
    v2: number,
    row1: RawRow,
    row2: RawRow,
  ) => {
    console.log(row1);

    const parentData1 = findParentData(summedData, row1);
    const parentData2 = findParentData(summedData, row2);

    if (parentData1.provinceData !== parentData2.provinceData) {
      return (
        (parentData2.provinceData as number) -
        (parentData1.provinceData as number)
      );
    }
    if (parentData1.districtData !== parentData2.districtData) {
      return (
        (parentData2.districtData as number) -
        (parentData1.districtData as number)
      );
    }

    return v2 - v1; // Descending order for the number column
  };

  // Add custom comparator to relevant columns
  const columnsWithComparator = columns.map(col => {
    if (col.type === 'number') {
      return {
        ...col,
        sortComparator: customComparator,
      };
    }

    return col;
  });

  console.log({ summedData });

  return (
    <DisasterTable
      columns={addDetailedReportLocationColumns(columnsWithComparator)}
      columnGroup={columnGroup}
      data={summedData}
      isEditable={false}
      getRowId={(row: {
        commune?: string;
        district?: string;
        province: string;
      }) => `${row.commune ?? row.district ?? row.province}`}
      getRowClassName={params => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { district, commune } = params.row;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!district && !commune) {
          return 'highlight-1';
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        } else if (district && !commune) {
          return 'highlight-2';
        }

        return '';
      }}
      rotateHeader={rotateHeader}
      columnHeaderHeight={100}
      border={border}
    />
  );
};
