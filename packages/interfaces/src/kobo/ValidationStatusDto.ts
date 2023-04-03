import { IsEnum, IsString } from 'class-validator';

export enum ValidationStatusValue {
  approved = 'validation_status_approved',
  onHold = 'validation_status_on_hold',
  notApproved = 'validation_status_not_approved',
}

export class ValidationStatusDto {
  @IsString() readonly timestamp!: number;
  @IsEnum(ValidationStatusValue) readonly uid!: ValidationStatusValue;
  @IsString() readonly by_whom!: string;
  @IsString() readonly color!: string;
  @IsString() readonly label!: string;
}
