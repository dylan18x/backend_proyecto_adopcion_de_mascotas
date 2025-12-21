import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { VacunacionesService } from './vacunaciones.service';
import { CreateVacunacionDto } from './dto/create-vacunacion.dto';
import { UpdateVacunacionDto } from './dto/update-vacunacion.dto';
import { Vacunacion } from './vacunacion.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('vacunaciones')
export class VacunacionesController {
  constructor(private readonly vacunacionesService: VacunacionesService) {}

  @Post()
  create(@Body() dto: CreateVacunacionDto) {
    return this.vacunacionesService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Vacunacion>> {
    limit = limit > 100 ? 100 : limit;
    return this.vacunacionesService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacunacionesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVacunacionDto) {
    return this.vacunacionesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacunacionesService.remove(id);
  }
}
