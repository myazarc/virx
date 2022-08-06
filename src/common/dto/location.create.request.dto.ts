import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LocationCreateRequestDTO {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty({ type: Boolean, required: false, default: true })
  isActive?: boolean;
}
