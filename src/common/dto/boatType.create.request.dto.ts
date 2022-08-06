import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BoatTypeCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
