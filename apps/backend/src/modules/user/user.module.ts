import { AdminResourceModule } from '@adminjs/nestjs';
import passwordsFeature from '@adminjs/passwords';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { hashPassword } from './passwordUtils';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AdminResourceModule.forFeature([
      {
        resource: User,
        options: {
          properties: { password: { isVisible: false } },
          navigation: {
            name: 'User Management',
            icon: 'User',
          },
        },
        features: [
          passwordsFeature({
            properties: {
              encryptedPassword: 'password',
              password: 'newPassword',
            },
            hash: hashPassword,
          }),
        ],
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
