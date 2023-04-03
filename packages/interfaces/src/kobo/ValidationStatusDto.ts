import { IsEnum, IsString } from 'class-validator';

import { ValidationStatusValue } from './constants';

export class ValidationStatusDto {
  @IsString() readonly timestamp!: number;
  @IsEnum(ValidationStatusValue) readonly uid!: ValidationStatusValue;
  @IsString() readonly by_whom!: string;
  @IsString() readonly color!: string;
  @IsString() readonly label!: string;
}
