import { Controller, Get, Query } from '@nestjs/common';
import { VeloriosService } from './velorios.service';
import { ListVelorioDto } from './dto/list-velorio.dto';

@Controller('velorios')
export class VeloriosController {
  constructor(private readonly veloriosService: VeloriosService) {}

  @Get()
  findActive(@Query('registro') registro?: string): Promise<ListVelorioDto[]> {
    return this.veloriosService.findActive(registro);
  }
}
