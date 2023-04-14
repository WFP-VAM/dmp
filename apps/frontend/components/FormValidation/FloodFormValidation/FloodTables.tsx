import { floodSpecificKeys } from '@wfp-dmp/interfaces';
import { reduce } from 'lodash';
import { useState } from 'react';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import { FloodCheckBoxes } from './FloodCheckBoxes';
import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from './tablesConfig/NumAffected-1';

export type FloodSpecificType = Record<
  keyof typeof floodSpecificKeys,
  string | undefined
>;

interface IProps {
  value: FloodSpecificType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
  isEditMode: boolean;
}

const formatThreatsString = (threats: string | undefined | object) => {
  if (threats === undefined) {
    return [];
  } else if (typeof threats === 'object') {
    return threats;
  } else {
    const threatsArr = threats.split(' ');

    return reduce(
      threatsArr,
      (obj, threat) => {
        obj[threat] = true;

        return obj;
      },
      {},
    );
  }
};

export const FloodTables = ({
  value,
  onChange,
  isEditMode,
}: IProps): JSX.Element => {
  const [formattedThreatsString, setFormattedThreatsString] = useState(
    formatThreatsString(value.threat),
  );

  return (
    <>
      <DisasterTable
        columns={NumAffected1Columns}
        columnGroup={NumAffected1ColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <FloodCheckBoxes
        threats={formattedThreatsString}
        onChange={onChange}
        value={value}
        isEditable={isEditMode}
        setFormattedThreatsString={setFormattedThreatsString}
      />
    </>
  );
};
