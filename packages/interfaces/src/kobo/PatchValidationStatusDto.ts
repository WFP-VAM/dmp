import { IsEnum, IsIn, IsString } from 'class-validator';

import { ValidationStatusValue } from './ValidationStatusDto';
import { DisasterType, DROUGHT, FLOOD, INCIDENT } from './constants';

export class PatchValidationStatusDto {
  @IsIn([FLOOD, DROUGHT, INCIDENT])
  readonly disasterType!: DisasterType;
  @IsString() readonly id!: string;
  @IsEnum(ValidationStatusValue) readonly validationStatusValue!: ValidationStatusValue;
}
