import { IsDateString, IsOptional, IsString } from 'class-validator';

export class GetFormsDto {
  @IsString() readonly disTyp!: string;
  @IsDateString() readonly startDate!: string;
  @IsDateString() readonly endDate!: string;
  @IsOptional() @IsString() readonly province?: string;
  @IsOptional() @IsString() readonly district?: string;
  @IsOptional() @IsString() readonly commune?: string;
}
