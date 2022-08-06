import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/common/response.service';
import { RegisterRequestDto } from './dto/register.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiResponse({ status: HttpStatus.CONFLICT })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @ApiTags('user')
  async register(@Body() body: RegisterRequestDto, @Res() res): Promise<any> {
    const response = new ResponseService();

    const result = await this.userService.register(body);
    if (result !== null) {
      if (result === 'User already exists') {
        response.setError(result);
        return res.status(HttpStatus.CONFLICT).json(response);
      } else {
        response.setStatus(true);
        response.setData(result);
        return res.status(HttpStatus.CREATED).json(response);
      }
    } else {
      response.setError('User not created');
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response);
    }
  }
}
