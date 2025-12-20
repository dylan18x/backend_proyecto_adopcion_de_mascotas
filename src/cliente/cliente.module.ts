import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './cliente.service';
import { ClientesController } from './cliente.controller';
import { Cliente } from './cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClientesController],
  providers: [ClientesService],
})
export class ClientesModule {}
