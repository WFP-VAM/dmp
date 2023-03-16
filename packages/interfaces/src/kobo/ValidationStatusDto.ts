import { IsString } from 'class-validator';

export class ValidationStatus {
  @IsString() readonly timestamp!: string;
  @IsString() readonly uid!:
    | 'validation_status_approved'
    | 'validation_status_on_hold'
    | 'validation_status_not_approved';
  @IsString() readonly by_whom!: string;
  @IsString() readonly color!: string;
  @IsString() readonly label!: string;
}
