import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Req } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('consultas')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Post()
  create(@Body() createDto: CreateConsultaDto, @Req() req: any) {
   
    createDto.userId = req.user.userId;
    return this.consultaService.create(createDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.consultaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateConsultaDto, @Req() req: any) {
    return this.consultaService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultaService.remove(id);
  }
}
