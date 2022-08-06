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
import { BoatCreateRequestDto } from 'src/common/dto/boat.create.request.dto';
import { BoatTypeCreateRequestDto } from 'src/common/dto/boatType.create.request.dto';
import { ResponseService } from 'src/common/response.service';
import { BoatService } from './boat.service';

@Controller('boat')
export class BoatController {
  constructor(private readonly boatService: BoatService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ResponseService })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiTags('boat')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  public async all(@Res() res): Promise<any> {
    const response = new ResponseService();
    const result = await this.boatService.all();

    if (result) {
      response.setStatus(true);
      response.setData(result);
      return res.status(HttpStatus.OK).json(response);
    } else {
      response.setError('Boat not found');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiTags('boat')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  public async create(
    @Res() res,
    @Req() req,
    @Body() payload: BoatCreateRequestDto,
  ): Promise<any> {
    const response = new ResponseService();
    payload.user = req.user.id;
    const result = await this.boatService.create(payload);
    if (result) {
      response.setStatus(true);
      response.setData(result);
      return res.status(HttpStatus.CREATED).json(response);
    } else {
      response.setError('Boat not created');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @Get('type/all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ResponseService })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiTags('boat')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  public async boatTypeAll(@Res() res): Promise<any> {
    const response = new ResponseService();
    const result = await this.boatService.boatTypeAll();

    if (result) {
      response.setStatus(true);
      response.setData(result);
      return res.status(HttpStatus.OK).json(response);
    } else {
      response.setError('Boat type not found');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  @Post('type/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiTags('boat')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  public async boatTypeCreate(
    @Res() res,
    @Body() payload: BoatTypeCreateRequestDto,
  ): Promise<any> {
    const response = new ResponseService();
    const result = await this.boatService.boatTypeCreate(payload);
    if (result) {
      response.setStatus(true);
      response.setData(result);
      return res.status(HttpStatus.CREATED).json(response);
    } else {
      response.setError('Boat type not created');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }
}
