import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './pago.entity';
import { PagosService } from './pago.service';
import { PagosController } from './pago.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pago])],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagoModule {}
