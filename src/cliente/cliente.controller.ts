<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Cliente } from './cliente.entity';
=======
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './cliente.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clienteService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
<<<<<<< HEAD
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Cliente>> {
    limit = limit > 100 ? 100 : limit;
    return this.clienteService.findAll({ page, limit });
=======
    findAll(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
    ): Promise<Pagination<Cliente>> {
      limit = limit > 100 ? 100 : limit;
      return this.clientesService.findAll({ page, limit });
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}