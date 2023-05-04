import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

import { ValidationStatusDto } from './ValidationStatusDto';

export class IncidentDto {
  @IsPositive() readonly '_id'!: number;
  @IsString() readonly 'formhub/uuid'!: string;
  @IsDateString() readonly 'start'!: string;
  @IsDateString() readonly 'end'!: string;
  @IsString() readonly 'G1/q_Enum'!: string;
  @IsOptional() @IsString() readonly 'G1/q_Funtion'!: string;
  @IsOptional() @IsString() readonly 'G1/q_Phone'!: string;
  @IsDateString() readonly 'G1/Date_report'!: string;
  @IsDateString() readonly 'G2/Date_Dis'!: string;
  @IsNumberString() readonly 'G2/DisTyp'!: string;
  @IsOptional() @IsString() readonly 'G2/Specify'?: string;
  @IsString() @Length(2) readonly 'G2/Province'!: string;
  @IsString() @Length(4) readonly 'G2/District'!: string;
  @IsString() @Length(6) readonly 'G2/Commune'!: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_pf1pd97/NumVillAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_pf1pd97/NumFamAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_pf1pd97/NumPeoAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_pf1pd97/NumFeAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_bz3jq33/NumDeathTo'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_bz3jq33/NumMeDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_bz3jq33/NumFeDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_bz3jq33/NumKidDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_bz3jq33/NumOldDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_bz3jq33/NumDisDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_th37h10/ToNumMising'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_th37h10/NumMeMising'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_th37h10/NumFeMising'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_th37h10/NumKidMising'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_th37h10/NumOldMising'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_th37h10/NumDisMising'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sa7hz27/ToNumInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sa7hz27/NumMeInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sa7hz27/NumFeInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sa7hz27/NumKidInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sa7hz27/NumOldInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sa7hz27/NumDisInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sg8yl06/NumFamEva'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sg8yl06/NumPeoEva'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sg8yl06/NumMeEva'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sg8yl06/NumFeEva'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sg8yl06/NumKidEva'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sg8yl06/NumOldEva'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_sg8yl06/NumDisEva'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_mq8uz76/NumFamRe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_mq8uz76/NumPeoRe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_mq8uz76/NumMeRe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_mq8uz76/NumFeRe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_mq8uz76/NumKidRe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_mq8uz76/NumOldRe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_tc1fy38/group_mq8uz76/NumDisRe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_cn0sw74/PartlyBurn'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_cn0sw74/CompletBurn'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_ez5mr58/SchAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_ez5mr58/SchDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_bj6tu99/HealthAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_bj6tu99/HealthDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_pv8hz72/RivBreakLo'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_pv8hz72/RivBreakWid'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_pv8hz72/NationalRod'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_pv8hz72/RuralRoad'?: string;
  @IsOptional() @IsNumberString() readonly 'group_fh3jp70/group_pv8hz72/Bridge'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_wa9cj38/PagoAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_wa9cj38/PagoDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_fg5ko43/BuildingAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_fg5ko43/BuildingDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_hi74i16/MarketAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_hi74i16/MarketDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_lf9ou90/StorageAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_lf9ou90/StorageDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_ub2hp14/CraftAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pk03i04/group_ub2hp14/CraftDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_na4yi04/CropAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_na4yi04/CropDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_yh83p68/SamnabAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_yh83p68/SamnabDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_en38q31/PaddyAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_en38q31/PaddyDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_wb0mf29/CowDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_wb0mf29/BaffoDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_wb0mf29/PigDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_wb0mf29/ChickDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_gu1xp89/NumJungleAf'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gh6ag70/group_gu1xp89/FarmAf'?: string;
  @IsString() readonly '__version__'!: string;
  @IsString() readonly 'meta/instanceID'!: string;
  @IsOptional() @IsString() readonly 'meta/deprecatedID'?: string;
  @IsString() readonly '_xform_id_string'!: string;
  @IsString() readonly '_uuid'!: string;
  @IsArray() readonly '_attachments'!: unknown[];
  @IsString() readonly '_status'!: string;
  @IsArray() readonly '_geolocation'!: (number | null)[];
  @IsDateString() readonly '_submission_time'!: string;
  @IsArray() readonly '_tags'!: unknown[];
  @IsArray() readonly '_notes'!: unknown[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional() @ValidateNested() @Type(() => ValidationStatusDto) readonly '_validation_status'!:
    | ValidationStatusDto
    | Record<string, never>;
  @IsOptional() @IsString() readonly '_submitted_by'!: string | null;
}

export class IncidentQueryResponseDto {
  @IsPositive() readonly count!: number;
  @IsString() readonly next!: string | null;
  @IsString() readonly previous!: string | null;
  @IsArray() readonly results!: IncidentDto[];
}
