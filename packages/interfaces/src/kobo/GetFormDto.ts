import { IsString } from 'class-validator';

import { DisasterType } from './constants';

export class GetFormDto {
  @IsString() readonly disasterType!: DisasterType;
  @IsString() readonly id!: string;
}
