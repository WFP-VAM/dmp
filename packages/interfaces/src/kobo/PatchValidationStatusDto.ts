import { IsEnum, IsIn, IsString } from 'class-validator';

import { DisasterType, DROUGHT, FLOOD, INCIDENT, ValidationStatusValue } from './constants';

export class PatchValidationStatusDto {
  @IsIn([FLOOD, DROUGHT, INCIDENT])
  readonly disasterType!: DisasterType;
  @IsString() readonly id!: string;
  @IsEnum(ValidationStatusValue) readonly validationStatusValue!: ValidationStatusValue;
}
