/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

import {
  addCommuneLevelReportLocationColumns,
  AddProvinceLevelReportLocationColumnsParams,
} from 'utils/tableFormatting';

import { createCustomComparator } from './CustomCommuneSort';
import { DisasterTable, DisasterTableProps } from './DisasterTable';

interface IProps {
  locationParams: AddProvinceLevelReportLocationColumnsParams;
  disasterTableParams: Pick<
    DisasterTableProps,
    'data' | 'variant' | 'isFirstTable'
  >;
}

export const CommuneLevelReportTable = ({
  locationParams,
  disasterTableParams,
}: IProps): JSX.Element => {
  const { data } = disasterTableParams;

  const summedData = React.useMemo(() => {
    // Create a map to group data by district
    const districtMap = new Map<string, typeof data>();
    data.forEach(x => {
      const key = String(x.district);
      const val = districtMap.get(key) ?? [];
      districtMap.set(key, [...val, x]);
    });

    // Group data by commune within each district and sum the values
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
          if (k === 'village') {
            // @ts-ignore
            // eslint-disable-next-line
            acc[k] = (acc[k] ?? []).concat(x[k] ?? []);

            return;
          }
          if (typeof acc[k] === 'number' && typeof x[k] === 'number') {
            acc[k] += x[k];
          } else if (typeof x[k] === 'number') {
            acc[k] = x[k];
          }
        });
      });

      return [acc, ...arr];
    });

    // Create a map to group summed districts by province
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
          if (k === 'village') {
            // @ts-ignore
            // eslint-disable-next-line
            acc[k] = (acc[k] || []).concat(first[k] || []);

            return;
          }
          const accNumber = typeof acc[k] === 'number';
          const xNumber = typeof first[k] === 'number';
          if (xNumber) {
            acc[k] = accNumber
              ? (acc[k] as number) + (first[k] as number)
              : first[k];
          }
        });
      });

      return [acc, ...arr];
    });

    return provincesSummed.flat().flat();
  }, [data]);

  // Add custom comparator to relevant columns
  const columnsWithComparator = locationParams.columns.map(col => {
    if (col.type === 'number') {
      return {
        ...col,
        sortComparator: createCustomComparator(summedData),
      };
    }

    return col;
  });

  const res = addCommuneLevelReportLocationColumns({
    columns: columnsWithComparator as GridColDef[],
    columnGroup: locationParams.columnGroup,
    groupParams: locationParams.groupParams,
  });

  return (
    <DisasterTable
      columns={res.columns}
      columnGroup={res.columnGroup}
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
      columnHeaderHeight="large"
      variant={disasterTableParams.variant}
      isFirstTable={disasterTableParams.isFirstTable}
    />
  );
};
