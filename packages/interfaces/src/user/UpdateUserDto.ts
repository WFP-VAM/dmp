import { IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional() readonly name?: string;
  @IsOptional() readonly password?: string;
  @IsOptional() readonly email?: string;
}
