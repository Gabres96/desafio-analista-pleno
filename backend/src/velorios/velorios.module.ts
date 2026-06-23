import { Module } from '@nestjs/common';
import { VeloriosController } from './velorios.controller';
import { VeloriosService } from './velorios.service';

@Module({
  controllers: [VeloriosController],
  providers: [VeloriosService],
  exports: [VeloriosService],
})
export class VeloriosModule {}
