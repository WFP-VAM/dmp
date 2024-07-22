/* eslint-disable complexity */
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import React from 'react';

import { addDetailedReportLocationColumns } from 'utils/tableFormatting';

import { createCustomComparator } from './CustomCommuneSort';
import { DisasterTable } from './DisasterTable';

interface IProps {
  columns: GridColDef[];
  columnGroup: GridColumnGroupingModel;
  data: Record<string, string | number | undefined>[];
  rotateHeader?: boolean;
  border?: boolean;
}

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

  // Add custom comparator to relevant columns
  const columnsWithComparator = columns.map(col => {
    if (col.type === 'number') {
      return {
        ...col,
        sortComparator: createCustomComparator(summedData),
      };
    }

    return col;
  });

  return (
    <DisasterTable
      columns={addDetailedReportLocationColumns(
        columnsWithComparator as GridColDef[],
        border,
      )}
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
