<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VeterinariosService } from './veterinario.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Veterinario } from './veterinario.entity';
=======
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { VeterinariosService } from './veterinario.service';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { Veterinario } from './veterinario.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee

@Controller('veterinarios')
export class VeterinariosController {
  constructor(private readonly veterinarioService: VeterinariosService) {}

  @Post()
  create(@Body() createVeterinarioDto: CreateVeterinarioDto) {
    return this.veterinarioService.create(createVeterinarioDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Veterinario>> {
    limit = limit > 100 ? 100 : limit;
<<<<<<< HEAD
    return this.veterinarioService.findAll({ page, limit });
=======
    return this.veterinariosService.findAll({ page, limit });
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veterinarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeterinarioDto: UpdateVeterinarioDto) {
    return this.veterinarioService.update(id, updateVeterinarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veterinarioService.remove(id);
  }
}