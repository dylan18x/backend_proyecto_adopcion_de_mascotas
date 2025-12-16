import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VacunacionesService } from './vacunaciones.service';
import { CreateVacunacionDto } from './dto/create-vacunacion.dto';
import { UpdateVacunacionDto } from './dto/update-vacunacion.dto';

@Controller('vacunaciones')
export class VacunacionesController {
  constructor(private readonly vacunacionesService: VacunacionesService) {}

  @Post()
  create(@Body() createVacunacionDto: CreateVacunacionDto) {
    return this.vacunacionesService.create(createVacunacionDto);
  }

  @Get()
  findAll() {
    return this.vacunacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacunacionesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateVacunacionDto: UpdateVacunacionDto) {
    return this.vacunacionesService.update(id, updateVacunacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacunacionesService.remove(id);
  }
}
