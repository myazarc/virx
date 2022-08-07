import { Inject, Injectable, Logger } from '@nestjs/common';
import { compare } from 'src/common/passwordHash';
import { LoginRequestDto } from 'src/common/dto/login.request.dto';
import { UserRepository } from '../domain/user.repository';
import { RegisterRequestDto } from './dto/register.request.dto';
import { InjectionToken } from './injection.token';

@Injectable()
export class UserService {
  constructor(
    @Inject(InjectionToken.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<any> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (user) {
        if (await compare(password, user.password)) {
          return user;
        }
      }

      return null;
    } catch (error) {}
  }

  async register({ name, email, password }: RegisterRequestDto): Promise<any> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        const newUser = await this.userRepository.create({
          id: null,
          name,
          email,
          password,
          emailConfirmed: true,
        });
        if (newUser) {
          //TODO: send email to user with link to confirm email
          const { password, ...result } = newUser;
          return result;
        }
        return null;
      }
      //TODO: must be error handling
      return 'User already exists';
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
