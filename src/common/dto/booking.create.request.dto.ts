import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class BookingCreateRequestDto {
  bookingNo: string;
  bookingDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, required: true })
  boat: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: Date, required: true })
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ type: Date, required: true })
  endDate: Date;

  user: number;
  totalPrice: number;
  paidPrice: number;
  balance: number;
}
