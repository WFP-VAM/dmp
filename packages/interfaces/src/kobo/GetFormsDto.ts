import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class GetFormsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly disTyps?: string[];
  @IsDateString() readonly startDate!: string;
  @IsDateString() readonly endDate!: string;
  @IsOptional() @IsString() readonly province?: string | string[];
  @IsOptional() @IsString() readonly district?: string | string[];
  @IsOptional() @IsString() readonly commune?: string | string[];
}
