import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
