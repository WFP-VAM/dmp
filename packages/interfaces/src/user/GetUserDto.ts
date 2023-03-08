export default class GetUserDto {
  id!: string;
  name!: string;
  email!: string;
  province?: string;
  roles!: string[];
  createdAt!: string;
  updatedAt!: string;
}
