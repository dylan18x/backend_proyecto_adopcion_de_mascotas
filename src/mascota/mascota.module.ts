import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascota } from './mascota.entity';
import { MascotasService } from './mascota.service';
import { MascotasController } from './mascota.controller';
import { Cliente } from 'src/cliente/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mascota, Cliente])],
  controllers: [MascotasController],
  providers: [MascotasService],
})
export class MascotasModule {}
