import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): { status: string; message: string } {
    return { status: 'ok', message: 'Dashboard de Velórios API' };
  }

  @Get('health')
  health(): { status: string } {
    return { status: 'ok' };
  }
}
