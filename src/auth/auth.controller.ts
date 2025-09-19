import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ResponseMessage('User login')
  handleLogin(@User() user: IUser, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(user, res);
  }

  @Public()
  @ResponseMessage('Register a new user')
  @Post('register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get('account')
  @ResponseMessage('Get user information')
  handleGetAccount(@User() user: IUser) {
    return { user };
  }

  @Public()
  @Get('refresh')
  @ResponseMessage('Get user by refresh token')
  handleRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refresh_token'];

    return this.authService.processNewToken(refreshToken, res);
  }
}
