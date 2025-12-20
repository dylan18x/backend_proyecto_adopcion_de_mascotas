import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacunacionesService } from './vacunaciones.service';
import { VacunacionesController } from './vacunaciones.controller';
import { Vacunacion } from './vacunacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacunacion])],
  controllers: [VacunacionesController],
  providers: [VacunacionesService],
})
export class VacunacionesModule {}
