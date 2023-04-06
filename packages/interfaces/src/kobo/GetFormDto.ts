import { IsIn, IsString } from 'class-validator';

import { DisasterType, DROUGHT, FLOOD, INCIDENT } from './constants';

export class GetFormDto {
  @IsIn([FLOOD, DROUGHT, INCIDENT])
  readonly disasterType!: DisasterType;
  @IsString() readonly id!: string;
}
