import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Req } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('citas')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Post()
  create(@Body() createDto: CreateCitaDto, @Req() req: any) {
    createDto.usuarioId = req.user.userId;
    return this.citaService.create(createDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.citaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCitaDto) {
    return this.citaService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citaService.remove(id);
  }
}
