import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LocationCreateRequestDto {
  @IsString()
  @ApiProperty()
  name: string;
  @ApiProperty({ type: Boolean, required: false, default: true })
  @IsOptional()
  isActive?: boolean;
}
