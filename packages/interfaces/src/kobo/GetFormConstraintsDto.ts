import { IsIn } from 'class-validator';

import { DisasterType, DROUGHT, FLOOD, INCIDENT } from './constants';

export class GetFormConstraintsDto {
  @IsIn([FLOOD, DROUGHT, INCIDENT])
  readonly disasterType!: DisasterType;
}
