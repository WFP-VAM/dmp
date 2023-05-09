import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum ValidationStatusValue {
  approved = 'validation_status_approved',
  onHold = 'validation_status_on_hold',
  notApproved = 'validation_status_not_approved',
}

export class ValidationStatusDto {
  @IsOptional() @IsNumber() readonly timestamp!: number;
  @IsOptional() @IsEnum(ValidationStatusValue) readonly uid!: ValidationStatusValue;
  @IsOptional() @IsString() readonly by_whom!: string;
  @IsOptional() @IsString() readonly color!: string;
  @IsOptional() @IsString() readonly label!: string;
}
