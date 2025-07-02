import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Render('home')
  handleHomePage(): { message: string } {
    const message = this.appService.getHello();
    return { message };
  }
}
