import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Render('home')
  handleHomePage() {
    const message = this.appService.getHello();
    return { message };
  }
}
