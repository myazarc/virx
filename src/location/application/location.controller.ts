import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocationCreateRequestDTO } from 'src/common/dto/location.create.request.dto';
import { ResponseService } from 'src/common/response.service';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ResponseService })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiTags('location')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  public async all(@Res() res): Promise<any> {
    const response = new ResponseService();
    const result = await this.locationService.all();

    if (result) {
      response.setStatus(true);
      response.setData(result);
      return res.status(HttpStatus.OK).json(response);
    } else {
      response.setError('Location not found');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiTags('location')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  public async create(
    @Res() res,
    @Body() payload: LocationCreateRequestDTO,
  ): Promise<any> {
    const response = new ResponseService();

    const result = await this.locationService.create(payload);
    if (result) {
      response.setStatus(true);
      response.setData(result);
      return res.status(HttpStatus.CREATED).json(response);
    } else {
      response.setError('Location not created');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }
}
