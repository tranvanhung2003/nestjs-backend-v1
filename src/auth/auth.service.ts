import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import ms from 'ms';
import { RolesService } from 'src/roles/roles.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly rolesService: RolesService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      return null;
    }

    const isValid = this.usersService.isValidPassword(pass, user.password);
    if (!isValid) {
      return null;
    }

    const userRole = user.role as unknown as { _id: string; name: string };
    const temp = await this.rolesService.findOne(userRole._id);

    const objUser = {
      ...user.toObject(),
      permissions: temp?.permissions ?? [],
    };

    return objUser;
  }

  async login(user: IUser, res: Response) {
    const { _id, name, email, role, permissions } = user;
    const payload = {
      iss: 'from server',
      _id,
      name,
      email,
      role,
    };
    const payloadAccess = {
      sub: 'access token',
      ...payload,
    };
    const payloadRefresh = {
      sub: 'refresh token',
      ...payload,
    };

    const refreshToken = this.createRefreshToken(payloadRefresh);

    // update user with refresh token
    await this.usersService.updateUserToken(_id, refreshToken);

    // set refresh_token as cookies
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
    });

    return {
      access_token: this.jwtService.sign(payloadAccess),
      user: {
        _id,
        name,
        email,
        role,
        permissions,
      },
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    return await this.usersService.register(registerUserDto);
  }

  createRefreshToken(payload: any) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn:
        ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000,
    });

    return refreshToken;
  }

  async processNewToken(refreshToken: string, res: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      const user = await this.usersService.findUserByToken(refreshToken);

      if (!user) {
        throw new BadRequestException(
          'Refresh token không hợp lệ. Vui lòng login.',
        );
      }

      const { _id, name, email, role } = user;
      const payload = {
        iss: 'from server',
        _id,
        name,
        email,
        role,
      };
      const payloadAccess = {
        sub: 'access token',
        ...payload,
      };
      const payloadRefresh = {
        sub: 'refresh token',
        ...payload,
      };

      const newRefreshToken = this.createRefreshToken(payloadRefresh);

      // update user with refresh token
      await this.usersService.updateUserToken(_id.toString(), newRefreshToken);

      // fetch user's role
      const userRole = user.role as unknown as { _id: string; name: string };
      const temp = await this.rolesService.findOne(userRole._id);

      // set refresh_token as cookies
      res.clearCookie('refresh_token');
      res.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
      });

      return {
        access_token: this.jwtService.sign(payloadAccess),
        user: {
          _id,
          name,
          email,
          role,
          permissions: temp?.permissions ?? [],
        },
      };
    } catch (error) {
      throw new BadRequestException(
        'Refresh token không hợp lệ. Vui lòng login.',
      );
    }
  }

  async logout(user: IUser, res: Response) {
    await this.usersService.updateUserToken(user._id, '');
    res.clearCookie('refresh_token');

    return 'ok';
  }
}
