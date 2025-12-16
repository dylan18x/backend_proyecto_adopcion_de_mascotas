import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeterinariosService } from './veterinario.service';
import { VeterinariosController } from './veterinario.controller';
import { Veterinario } from './veterinario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veterinario])],
  controllers: [VeterinariosController],
  providers: [VeterinariosService],
})
export class VeterinariosModule {}
