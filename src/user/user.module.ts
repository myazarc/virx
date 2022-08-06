import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { InjectionToken } from './application/injection.token';
import { UserController } from './application/user.controller';
import { UserService } from './application/user.service';
import { UserRepositoryImplement } from './infrastructure/repository/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: InjectionToken.UserRepository,
      useClass: UserRepositoryImplement,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
