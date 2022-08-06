import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class BookingSearchRequestDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  location: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: Date, required: true })
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: Date, required: true })
  endDate: Date;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: [Number], required: false })
  type?: number[];

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  priceStart?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  priceEnd?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, required: false })
  isCrewed?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  personCapacityStart?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  personCapacityEnd?: number;
}
