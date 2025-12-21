<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MascotasService } from './mascota.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Mascota } from './mascota.entity';
=======
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MascotasService } from './mascota.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Mascota } from './mascota.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee

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
<<<<<<< HEAD
    return this.mascotaService.findAll({ page, limit });
=======
    return this.mascotasService.findAll({ page, limit });
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee
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