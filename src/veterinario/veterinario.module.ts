import { Module } from '@nestjs/common';
import { VeterinarioController } from './veterinario.controller';
import { VeterinarioService } from './veterinario.service';

@Module({
  controllers: [VeterinarioController],
  providers: [VeterinarioService]
})
export class VeterinarioModule {}
