import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      return null;
    }

    const isValid = this.userService.isValidPassword(password, user.password);

    if (!isValid) {
      return null;
    }

    const { password: _, ...result } = user.toObject();
    return result;
  }
}
