import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class GetFormsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly disTyps?: string[];
  @IsDateString() readonly startDate!: string;
  @IsDateString() readonly endDate!: string;
  @IsOptional() @IsArray() @IsString({ each: true }) readonly province?: string | string[];
  @IsOptional() @IsArray() @IsString({ each: true }) readonly district?: string | string[];
  @IsOptional() @IsArray() @IsString({ each: true }) readonly commune?: string | string[];
}
