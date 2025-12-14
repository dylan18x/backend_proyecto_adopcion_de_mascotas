import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMedico } from './entities/historial_medico.entity';
import { HistorialMedicoService } from './historial_medico.service';
import { HistorialMedicoController } from './historial_medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialMedico])],
  providers: [HistorialMedicoService],
  controllers: [HistorialMedicoController],
})
export class HistorialMedicoModule {}
