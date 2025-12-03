import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdopcionesService } from './adopciones.service';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { UpdateAdopcionDto } from './dto/update-adopcion.dto';

@Controller('adopciones')
export class AdopcionesController {
  constructor(private readonly adopcionesService: AdopcionesService) {}

  @Post()
  create(@Body() createAdopcionDto: CreateAdopcionDto) {
    return this.adopcionesService.create(createAdopcionDto);
  }

  @Get()
  findAll() {
    return this.adopcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adopcionesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdopcionDto: UpdateAdopcionDto) {
    return this.adopcionesService.update(id, updateAdopcionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adopcionesService.remove(id);
  }
}
