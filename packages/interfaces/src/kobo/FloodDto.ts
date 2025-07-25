import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsIn,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

import { ValidationStatusDto } from './ValidationStatusDto';

export class FloodDto {
  @IsPositive() readonly '_id'!: number;
  @IsString() readonly 'formhub/uuid'!: string;
  @IsDateString() readonly 'start'!: string;
  @IsDateString() readonly 'end'!: string;
  @IsString() readonly 'g1/q_Enum'!: string;
  @IsOptional() @IsString() readonly 'g1/q_Funtion'!: string;
  @IsOptional() @IsString() readonly 'g1/q_Phone'!: string;
  @IsDateString() readonly 'g1/Date_report'!: string;
  @IsString() @Length(2) readonly 'g2/Province'!: string;
  @IsString() @Length(4) readonly 'g2/District'!: string;
  @IsString() @Length(6) readonly 'g2/Commune'!: string;
  @IsString() readonly 'g2/village'?: string;
  @IsDateString() readonly 'g2/Date_Dis'!: string;
  @IsNumberString() readonly 'g2/DisTyp'!: string;
  @IsOptional() @IsNumberString() readonly 'g2/flood_n'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g3_1/NumVillAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g3_1/g3_2/NumFamAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g3_1/g3_2/NumPeoAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g3_1/g3_2/NumFeAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g4/TNumDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g4/NumMeDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g4/NumFeDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g4/NumKidDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g4/NumOldDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g4/NumDisDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g5/NumTMising'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g5/NumMeMising'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g5/NumFeMising'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g5/NumKidMising'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g5/NumOldMising'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g5/NumDisMising'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g6/NumTInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g6/NumMeInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g6/NumFeInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g6/NumKidInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g6/NumOldInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g6/NumDisInjure'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g7/NumFamEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g7/NumPeoEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g7/NumMeEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g7/NumFeEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g7/NumKidEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g7/NumOldEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g7/NumDisEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g8/NumFamRe'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g8/NumPeoRe'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g8/NumMeRe'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g8/NumFeRe'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g8/NumKidRe'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g8/NumOldRe'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g8/NumDisRe'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g9/NumSafePla'?: string;
  @IsOptional() @IsNumberString() readonly 'g3/g9/NumPeoSEC'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_1/NumHouAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_1/NumHouDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_2/NumSchoAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_2/NumSchoDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_3/NumAffHeal'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_3/NumDamHeal'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_4/NumPagoAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_4/NumPagoDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_5/NumBuilAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_5/NumBuilDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_6/NumShopAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_6/NumShopDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_7/NumWareHAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_7/NumWareHDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_8/NumCraftAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g10/g10_8/NumCraftDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_1/FarmAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_1/FarmDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_1/ToNamAgriAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_1/NumFarmCroAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_2/NumFarmPaddyAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_2/SamNabAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_2/SamNabDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_3/PaddyAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_3/PaddyDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_4/CowEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_4/CowDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_4/CowMissing'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_5/PigEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_5/PigDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_5/PigMissing'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_6/BirdEva'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_6/BirdDeath'?: string;
  @IsOptional() @IsNumberString() readonly 'g11/g11_6/BirdMissing'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_1/RubberRoAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_1/RubberRoDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_2/ConcretAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_2/ConcretDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_3/RuralRoAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_3/RuralRoDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_4/BridgeAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_4/BridgeDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_5/BeleBridAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_5/BeleBridDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_6/DrainageAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g12/g12_6/DrainageDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_1/DamAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_1/DamDamaged'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_2/WatGateAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_2/WatGateDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_3/PlumWelAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_3/PlumWelDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_4/DigWellAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_4/DigWellDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_5/PondAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_5/PondDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_6/LatrineAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_6/LatrineDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_7/RiverBreak'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/g13_7/RiverBreakLo'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/BrolayAff'?: string;
  @IsOptional() @IsNumberString() readonly 'g13/BrolayDam'?: string;
  @IsOptional() @IsNumberString() readonly 'g14/g14_1/NumFamTent'?: string;
  @IsOptional() @IsNumberString() readonly 'g14/g14_1/NumPeoTent'?: string;
  @IsOptional() @IsNumberString() readonly 'g14/g14_2/NumFamBuil'?: string;
  @IsOptional() @IsNumberString() readonly 'g14/g14_2/NumPeoBuil'?: string;
  @IsOptional() @IsNumberString() readonly 'g14/g14_3/NumFamRela'?: string;
  @IsOptional() @IsNumberString() readonly 'g14/g14_3/NumPeoRela'?: string;
  @IsOptional() @IsNumberString() readonly 'g15/g15_1/NumTemSch'?: string;
  @IsOptional() @IsNumberString() readonly 'g15/g15_1/StuAcTemSch'?: string;
  @IsOptional() @IsNumberString() readonly 'g15/g15_2/SchUseSafe'?: string;
  @IsOptional() @IsNumberString() readonly 'g15/g15_2/NumStu'?: string;
  @IsOptional() @IsNumberString() readonly 'g15/g15_3/NumSchStop'?: string;
  @IsOptional() @IsNumberString() readonly 'g15/g15_3/NumStuNoCla'?: string;
  @IsOptional() @IsNumberString() readonly 'g16_1/g16_1_001/NumFamNoWa'?: string;
  @IsOptional() @IsNumberString() readonly 'g16_1/g16_1_001/NumPeoNoWa'?: string;
  @IsOptional() @IsNumberString() readonly 'g16_1/g16_1_001/TimeAceWa'?: string;
  @IsOptional() @IsNumberString() readonly 'g16_1/g16_1_001/NuFamNoWaEq'?: string;
  @IsOptional() @IsNumberString() readonly 'g16_1/g16_1_001/NuFamNoLat'?: string;
  @IsOptional() @IsNumberString() readonly 'g17/g17_1/NonActingH'?: string;
  @IsOptional() @IsNumberString() readonly 'g17/g17_1/PeoCanAceH'?: string;
  @IsOptional() @IsNumberString() readonly 'g17/g17_1/NumDoctor'?: string;
  @IsOptional() @IsNumberString() readonly 'g17/g17_1/NumNurse'?: string;
  @IsOptional() @IsNumberString() readonly 'g17/g17_1/NumStaff'?: string;
  @IsOptional() @IsNumberString() readonly 'g18/g18_1/NumFamNoFod'?: string;
  @IsOptional() @IsNumberString() readonly 'g18/g18_1/NumPeoNoFod'?: string;
  @IsOptional() @IsNumberString() readonly 'g18/FamNoFod7d'?: string;
  @IsOptional() @IsNumberString() readonly 'g18/g18_2/NumActShop'?: string;
  @IsOptional() @IsNumberString() readonly 'g18/g18_2/NumNoActShop'?: string;
  @IsOptional() @IsIn(['1', '2']) readonly 'g18/RicePrice'?: string;
  @IsOptional() @Matches(/^[0-9 ]+$/) readonly 'g19/threat'?: string;
  @IsOptional() @IsString() readonly 'g19/other'?: string;
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
    | Record<string, undefined>;
  @IsOptional() @IsString() readonly '_submitted_by'!: string | null;
}

export class FloodQueryResponseDto {
  @IsPositive() readonly count!: number;
  @IsString() readonly next!: string | null;
  @IsString() readonly previous!: string | null;
  @IsArray() readonly results!: FloodDto[];
}
