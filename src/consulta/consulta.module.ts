import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './consulta.entity';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta])],
  providers: [ConsultaService],
  controllers: [ConsultaController],
  exports: [ConsultaService],
})
export class ConsultaModule {}
