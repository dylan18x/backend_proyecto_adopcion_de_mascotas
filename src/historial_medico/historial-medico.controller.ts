import { Controller, Post, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { HistorialMedicoService } from './historial-medico.service';
import { CreateHistorialMedicoDto } from './dto/create-historial-medico.dto';
import { UpdateHistorialMedicoDto } from './dto/update-historial-medico.dto';
import { HistorialMedico } from './historial-medico.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/user.entity';

@Controller('historial-medico')
export class HistorialMedicoController {
  constructor(private readonly historialService: HistorialMedicoService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateHistorialMedicoDto) {
    return this.historialService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<HistorialMedico>> {
    limit = limit > 100 ? 100 : limit;
    return this.historialService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialService.findOne(id);
  }
  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHistorialMedicoDto) {
    return this.historialService.update(id, dto);
  }
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialService.remove(id);
  }
}