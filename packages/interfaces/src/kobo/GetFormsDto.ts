import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class GetFormsDto {
  @IsArray()
  @IsString({ each: true })
  readonly disTyps!: string[];
  @IsDateString() readonly startDate!: string;
  @IsDateString() readonly endDate!: string;
  @IsOptional() @IsString() readonly province?: string;
  @IsOptional() @IsString() readonly district?: string;
  @IsOptional() @IsString() readonly commune?: string;
}
