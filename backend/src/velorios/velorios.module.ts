import { Module } from '@nestjs/common';
import { PdfModule } from '../pdf/pdf.module';
import { VeloriosController } from './velorios.controller';
import { VeloriosService } from './velorios.service';

@Module({
  imports: [PdfModule],
  controllers: [VeloriosController],
  providers: [VeloriosService],
  exports: [VeloriosService],
})
export class VeloriosModule {}
