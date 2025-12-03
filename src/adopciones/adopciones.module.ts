import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdopcionesService } from './adopciones.service';
import { AdopcionesController } from './adopciones.controller';
import { Adopcion } from './adopcion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adopcion])],
  controllers: [AdopcionesController],
  providers: [AdopcionesService],
})
export class AdopcionesModule {}
