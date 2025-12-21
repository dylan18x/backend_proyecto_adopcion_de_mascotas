import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Receta } from './receta.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly recetaService: RecetasService) {}

  @Post()
  create(@Body() createRecetaDto: CreateRecetaDto) {
    return this.recetaService.create(createRecetaDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Receta>> {
    limit = limit > 100 ? 100 : limit;
    return this.recetaService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recetaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecetaDto: UpdateRecetaDto) {
    return this.recetaService.update(id, updateRecetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recetaService.remove(id);
  }
}
