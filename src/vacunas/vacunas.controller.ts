import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { VacunasService } from './vacunas.service';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';
import { Vacuna } from './vacuna.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/user.entity';

@Controller('vacunas')
export class VacunasController {
  constructor(private readonly vacunaService: VacunasService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateVacunaDto) {
    return this.vacunaService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Vacuna>> {
    limit = limit > 100 ? 100 : limit;
    return this.vacunaService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacunaService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVacunaDto) {
    return this.vacunaService.update(id, dto);
  }
  
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacunaService.remove(id);
  }
}
