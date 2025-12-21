import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMedico } from './historial-medico.entity';
import { HistorialMedicoService } from './historial-medico.service';
import { HistorialMedicoController } from './historial-medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialMedico])],
  providers: [HistorialMedicoService],
  controllers: [HistorialMedicoController],
})
export class HistorialMedicoModule {}
