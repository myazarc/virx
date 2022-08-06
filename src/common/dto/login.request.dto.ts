import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginRequestDto {
  //TODO: Add i18n support
  @IsEmail(
    {},
    {
      message: 'Email is not valid',
    },
  )
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
