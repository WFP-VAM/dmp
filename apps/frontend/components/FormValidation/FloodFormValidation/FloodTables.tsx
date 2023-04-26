import { FloodSpecificType } from '@wfp-dmp/interfaces';
import { useIntl } from 'react-intl';

import { DisasterTable } from 'components/DisasterTable/DisasterTable';

import { FloodCheckBoxes } from './FloodCheckBoxes';
import {
  AgricultureColumnGroup,
  AgricultureColumns,
} from './tablesConfig/Agriculture';
import {
  EducationNeedsColumnGroup,
  EducationNeedsColumns,
} from './tablesConfig/EducationNeeds';
import {
  FoodNeedsColumnGroup,
  getFoodNeedsColumns,
} from './tablesConfig/FoodNeeds';
import {
  HealthNeedsColumnGroup,
  HealthNeedsColumns,
} from './tablesConfig/HealthNeeds';
import {
  HouseSocialColumnGroup,
  HouseSocialColumns,
} from './tablesConfig/HouseSocial';
import {
  InfrastructureColumnGroup,
  InfrastructureColumns,
} from './tablesConfig/Infrastructure';
import {
  IrrigationColumnGroup,
  IrrigationColumns,
} from './tablesConfig/Irrigation';
import {
  NumAffected1ColumnGroup,
  NumAffected1Columns,
} from './tablesConfig/NumAffected-1';
import {
  NumAffected2ColumnGroup,
  NumAffected2Columns,
} from './tablesConfig/NumAffected-2';
import {
  ShelterNeedsColumnGroup,
  ShelterNeedsColumns,
} from './tablesConfig/ShelterNeeds';
import {
  WaterNeedsColumnGroup,
  WaterNeedsColumns,
} from './tablesConfig/WaterNeeds';

interface IProps {
  value: FloodSpecificType;
  onChange: (event: FloodSpecificType) => void;
  isEditMode: boolean;
}

export const FloodTables = ({
  value,
  onChange,
  isEditMode,
}: IProps): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <DisasterTable
        columns={NumAffected1Columns}
        columnGroup={NumAffected1ColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={NumAffected2Columns}
        columnGroup={NumAffected2ColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={HouseSocialColumns}
        columnGroup={HouseSocialColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={AgricultureColumns}
        columnGroup={AgricultureColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={InfrastructureColumns}
        columnGroup={InfrastructureColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={IrrigationColumns}
        columnGroup={IrrigationColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={ShelterNeedsColumns}
        columnGroup={ShelterNeedsColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={EducationNeedsColumns}
        columnGroup={EducationNeedsColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={WaterNeedsColumns}
        columnGroup={WaterNeedsColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={HealthNeedsColumns}
        columnGroup={HealthNeedsColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <DisasterTable
        columns={getFoodNeedsColumns(intl)}
        columnGroup={FoodNeedsColumnGroup}
        data={[{ id: 1, ...value }]}
        onChange={onChange}
        isEditable={isEditMode}
      />
      <FloodCheckBoxes
        onChange={onChange}
        value={value}
        isEditable={isEditMode}
      />
    </>
  );
};
