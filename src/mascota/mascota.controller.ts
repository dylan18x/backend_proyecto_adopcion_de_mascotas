import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MascotasService } from './mascota.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Mascota } from './mascota.entity';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotaService: MascotasService) {}

  @Post()
  create(@Body() createMascotaDto: CreateMascotaDto) {
    return this.mascotaService.create(createMascotaDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Mascota>> {
    limit = limit > 100 ? 100 : limit;
    return this.mascotaService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    return this.mascotaService.update(id, updateMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotaService.remove(id);
  }
}