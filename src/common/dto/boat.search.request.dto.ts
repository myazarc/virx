import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class BoatSearchRequestDto {
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

  @IsNumberString({}, { each: true })
  @IsOptional()
  @ApiProperty({ type: [Number], required: false })
  type?: number[];

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  priceStart?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  priceEnd?: number;

  @IsBooleanString()
  @IsOptional()
  @ApiProperty({ type: Boolean, required: false })
  isCrewed?: boolean;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  personCapacityStart?: number;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ type: Number, required: false })
  personCapacityEnd?: number;
}
