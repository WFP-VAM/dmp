import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUpdateUserDto, CreateUserDto, GetUserDto, UpdateUserDto } from '@wfp-dmp/interfaces';
import { Repository } from 'typeorm';

import { hashPassword } from './passwordUtils';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  getUser = async (userId: string): Promise<GetUserDto> => {
    return await this.userRepository.findOneByOrFail({ id: userId });
  };

  createUser = async (userDto: CreateUserDto): Promise<GetUserDto> => {
    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: userDto.email })
      .getOne();

    if (existingUser) {
      throw new ConflictException();
    }

    const hashedPassword = await hashPassword(userDto.password);
    const { id: userId } = await this.userRepository.save({
      ...userDto,
      password: hashedPassword,
    });

    return await this.getUser(userId);
  };

  updateUser = async (
    userId: string,
    userDto: UpdateUserDto | AdminUpdateUserDto,
  ): Promise<GetUserDto> => {
    await this.userRepository.findOneByOrFail({ id: userId });
    let user = userDto;

    if (userDto.password !== undefined) {
      const hashedPassword = await hashPassword(userDto.password);
      user = { ...user, password: hashedPassword };
    }

    await this.userRepository.save({ ...user, id: userId });

    return await this.getUser(userId);
  };

  async onModuleInit() {
    const name = process.env.SUPERADMIN_USERNAME as string;
    const email = `${name}@superadmin.com`;
    const password = process.env.SUPERADMIN_PASSWORD as string;
    const roles = ['admin'];
    try {
      await this.createUser({ name, email, password, roles });
    } catch {
      console.log('Super user already exists');
    }
  }
}
