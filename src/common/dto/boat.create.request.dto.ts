import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class BoatCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  location: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, required: false, default: true })
  isActive?: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  prePaymentRate: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  personCapacity: number;

  @IsBoolean()
  @ApiProperty({ type: Boolean, required: true })
  isCrewed: boolean;

  user?: number;
}
