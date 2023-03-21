import { IsString } from 'class-validator';

export class GetFormsDto {
  @IsString() readonly DisTyp!: string;
}
