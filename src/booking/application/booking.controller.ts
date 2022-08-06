import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookingCreateRequestDto } from 'src/common/dto/booking.create.request.dto';
import { ResponseService } from 'src/common/response.service';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ResponseService })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiTags('booking')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  public async all(@Res() res): Promise<any> {
    const response = new ResponseService();
    const result = await this.bookingService.all();

    if (result) {
      response.setStatus(true);
      response.setData(result);
      return res.status(HttpStatus.OK).json(response);
    } else {
      response.setError('Booking not found');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiTags('booking')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  public async create(
    @Res() res,
    @Req() req,
    @Body() payload: BookingCreateRequestDto,
  ): Promise<any> {
    const response = new ResponseService();
    payload.user = req.user.id;

    const boat = await this.bookingService.getBoat(payload.boat);
    if (!boat) {
      response.setError('Boat not found');
      return res.status(HttpStatus.OK).json(response);
    }
    const isAvailable = await this.bookingService.boatIsAvailable(
      payload.boat,
      payload.startDate,
      payload.endDate,
    );

    if (!isAvailable) {
      response.setError('Boat is not available');
      return res.status(HttpStatus.OK).json(response);
    }

    payload.bookingDate = new Date();
    payload.bookingNo = (
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
    ).toString();
    payload.totalPrice =
      boat.price *
      this.bookingService.getDayCount(payload.startDate, payload.endDate);
    payload.paidPrice = (boat.prePaymentRate * payload.totalPrice) / 100;
    payload.balance = payload.totalPrice - payload.paidPrice;

    const result = await this.bookingService.create(payload);
    if (result) {
      response.setStatus(true);
      response.setData(result);
      return res.status(HttpStatus.CREATED).json(response);
    } else {
      response.setError('Booking not created');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }
}
