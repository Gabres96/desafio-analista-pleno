import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { VeloriosService } from './velorios.service';
import { PdfService } from '../pdf/pdf.service';
import { ListVelorioDto } from './dto/list-velorio.dto';

@Controller('velorios')
export class VeloriosController {
  constructor(
    private readonly veloriosService: VeloriosService,
    private readonly pdfService: PdfService,
  ) {}

  @Get()
  findActive(@Query('registro') registro?: string): Promise<ListVelorioDto[]> {
    return this.veloriosService.findActive(registro);
  }

  @Get(':id/banner')
  async getBanner(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const velorio = await this.veloriosService.findById(id);
    const pdf = this.pdfService.generateBanner(velorio);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="banner-${id}.pdf"`,
      'Content-Length': pdf.length,
    });

    res.end(pdf);
  }
}
