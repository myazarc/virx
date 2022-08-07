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
  @ApiProperty({
    description: 'Default email: mail@example.ext',
    default: 'mail@example.ext',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Default password: password',
    default: 'password',
  })
  password: string;
}
