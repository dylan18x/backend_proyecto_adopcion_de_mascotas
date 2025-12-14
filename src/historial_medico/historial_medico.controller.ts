import { Controller, Post, Body, Get } from '@nestjs/common';
import { HistorialMedicoService } from './historial_medico.service';

@Controller('historial-medico')
export class HistorialMedicoController {
  constructor(private readonly historialService: HistorialMedicoService) {}

  @Post()
  create(@Body() body) {
    return this.historialService.create(body);
  }

  @Get()
  findAll() {
    return this.historialService.findAll();
  }
}
