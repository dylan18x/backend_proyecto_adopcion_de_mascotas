import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { HistorialMedicoService } from './historial_medico.service';
import { HistorialMedico } from './entities/historial_medico.entity';

@Controller('historial_medico')
export class HistorialMedicoController {
  constructor(
    private readonly historialService: HistorialMedicoService,
  ) {}

  // POST
  @Post()
  create(@Body() data: Partial<HistorialMedico>) {
    return this.historialService.create(data);
  }

  // GET
  @Get()
  findAll() {
    return this.historialService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.historialService.findOne(Number(id));
  }

  // PUT
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<HistorialMedico>,
  ) {
    return this.historialService.update(Number(id), data);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.historialService.remove(Number(id));  
  }
}
