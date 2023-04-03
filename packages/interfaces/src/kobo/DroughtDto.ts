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

export class DroughtDto {
  @IsPositive() readonly '_id'!: number;
  @IsString() readonly 'formhub/uuid'!: string;
  @IsDateString() readonly 'start'!: string;
  @IsDateString() readonly 'end'!: string;
  @IsString() readonly 'group_ve4vz14/q_Enum'!: string;
  @IsDateString() readonly 'group_ve4vz14/Date_report'!: string;
  @IsString() readonly 'group_ve4vz14/q_Funtion'!: string;
  @IsString() readonly 'group_ve4vz14/q_Phone'!: string;
  @IsString() @Length(2) readonly 'group_yu9nq00/Province'!: string;
  @IsString() @Length(4) readonly 'group_yu9nq00/District'!: string;
  @IsString() @Length(6) readonly 'group_yu9nq00/Commune'!: string;
  @IsDateString() readonly 'group_yu9nq00/Date_Dis': string;
  @IsNumberString() readonly 'group_yu9nq00/DisTyp'!: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/NumVillAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_kx2wb92/NumFamAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_kx2wb92/NumPeoAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_kx2wb92/NumMe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_kx2wb92/NumFe'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_kx2wb92/NumKid'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_kx2wb92/NumOld'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_kx2wb92/NumDisMising'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_nk3zh15/TNumDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_nk3zh15/NumMeDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_nk3zh15/NumFeDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_nk3zh15/NumKidDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_nk3zh15/NumOldDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_dg01m69/group_nk3zh15/NumDisDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_rg2xt75/FamAgriAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_rg2xt75/FarmAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_rg2xt75/FarmDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_rg2xt75/SamNabAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_rg2xt75/SamNabDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_rg2xt75/PaddyAff'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_rg2xt75/PaddyDam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_pl5gf73/CowDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_pl5gf73/BaffoDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_pl5gf73/PigDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_yn34m57/group_pl5gf73/BirdDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_oh4fa74/NumSchNoHo2'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_oh4fa74/BotSourTang'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_oh4fa74/HSourNoTang'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_oh4fa74/NoSourHtang'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_oh4fa74/NoBtSourTan'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_oh4fa74/Electric'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_mv5vw26/HealCenNoHo2'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_mv5vw26/HBotSourTang'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_mv5vw26/HaSouNoTang'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_mv5vw26/NoSourHatan'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_mv5vw26/NoBtSouTan'?: string;
  @IsOptional() @IsNumberString() readonly 'group_em29q27/group_mv5vw26/ElecForHeal'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pa74w20/group_qu0fl63/DamHavWater'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pa74w20/group_qu0fl63/DamNoWater'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pa74w20/group_om0vk80/PondHavWat'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pa74w20/group_om0vk80/PondNoWate'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pa74w20/group_uv6lk64/PlumWelHaWat'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pa74w20/group_uv6lk64/PluWelNoWat'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pa74w20/group_nr51r72/DigWelHaWat'?: string;
  @IsOptional() @IsNumberString() readonly 'group_pa74w20/group_nr51r72/DigWelNoWat'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_sx5lq59/NuVilNedHep'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_sx5lq59/TNuFamNeHo2'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_sx5lq59/NumPeople'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_sx5lq59/NumMen'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_sx5lq59/NumWomen'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_sx5lq59/NumKids'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_sx5lq59/NumElder'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_sx5lq59/NumDis'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_ot4yf02/NumWatTank'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_ot4yf02/NuStorageFam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_ot4yf02/NumWateTank'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_ot4yf02/NumFilter'?: string;
  @IsOptional() @IsNumberString() readonly 'group_gn6qw58/group_ot4yf02/NumWatePur'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ei7de96/NumWatStor'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ei7de96/WatSorRepar'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ei7de96/WatStoRepar'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ei7de96/SolarNeed'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ei7de96/FanNeed'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ni05u89/WatStorNed'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ni05u89/WatSorRep'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ni05u89/WatStoRep'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ni05u89/NuSolarNeed'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lm0eq74/group_ni05u89/NumFanNeed'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lt1ab13/LandSize'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lt1ab13/PumMachine'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lt1ab13/NumGasoline'?: string;
  @IsOptional() @IsNumberString() readonly 'group_lt1ab13/NumFam'?: string;
  @IsOptional() @IsNumberString() readonly 'group_wi2jc00/FamNoIncom'?: string;
  @IsOptional() @IsNumberString() readonly 'group_wi2jc00/PeoNoIncom'?: string;
  @IsOptional() @IsNumberString() readonly 'group_wi2jc00/FamNoFod'?: string;
  @IsOptional() @IsNumberString() readonly 'group_wi2jc00/PeoNoFod'?: string;
  @IsOptional() @IsNumberString() readonly 'group_hp5cn05/NuKidColWat'?: string;
  @IsOptional() @IsNumberString() readonly 'group_hp5cn05/IfYes'?: string;
  @IsOptional() @IsNumberString() readonly 'group_hp5cn05/NuWoCollWat'?: string;
  @IsOptional() @IsNumberString() readonly 'group_hp5cn05/Yes'?: string;
  @IsOptional() @IsNumberString() readonly 'group_hp5cn05/TreatOccur'?: string;
  @IsString() readonly '__version__'!: string;
  @IsString() readonly 'meta/instanceID'!: string;
  @IsString() readonly '_xform_id_string'!: string;
  @IsString() readonly '_uuid'!: string;
  @IsArray() readonly '_attachments'!: unknown[];
  @IsString() readonly '_status'!: string;
  @IsArray() readonly '_geolocation'!: (number | null)[];
  @IsDateString() readonly '_submission_time'!: string;
  @IsArray() readonly '_tags'!: unknown[];
  @IsArray() readonly '_notes'!: unknown[];
  @ValidateNested() readonly '_validation_status'!: ValidationStatusDto | Record<string, never>;
  @IsString() readonly '_submitted_by'!: string | null;
}

export class DroughtQueryResponseDto {
  @IsPositive() readonly count!: number;
  @IsString() readonly next!: string | null;
  @IsString() readonly previous!: string | null;
  @IsArray() readonly results!: DroughtDto[];
}
