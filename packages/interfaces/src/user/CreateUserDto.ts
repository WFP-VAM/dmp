import { IsArray, IsOptional, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsString() readonly name!: string;
  @IsString() readonly email!: string;
  @IsString() readonly password!: string;
  @IsArray() readonly roles!: string[];
  @IsOptional() readonly province?: string;
}
