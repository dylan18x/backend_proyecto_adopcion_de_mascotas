import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMedico } from './entities/historial_medico.entity';
import { HistorialMedicoService } from './historial_medico.service';
import { HistorialMedicoController } from './historial_medico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialMedico])],
  controllers: [HistorialMedicoController],
  providers: [HistorialMedicoService],
})
export class HistorialMedicoModule {}
