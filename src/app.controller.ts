import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
  Request,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './common/dto/login.request.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiTags('user')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Body() body: LoginRequestDto): Promise<any> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiTags('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
