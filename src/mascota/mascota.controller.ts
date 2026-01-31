import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Patch
} from '@nestjs/common';
import { MascotasService } from './mascota.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Mascota } from './mascota.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { Public } from '../auth/public.decorator';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotaService: MascotasService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createMascotaDto: CreateMascotaDto) {
    return this.mascotaService.create(createMascotaDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ): Promise<Pagination<Mascota>> {
    limit = limit > 100 ? 100 : limit;
    return this.mascotaService.findAll({ page, limit });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotaService.findOne(id);
  }

  // SOLO ADMIN EDITA
  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMascotaDto: UpdateMascotaDto
  ) {
    return this.mascotaService.update(id, updateMascotaDto);
  }

  @Public()
  @Patch(':id/adoptar')
  adoptar(
    @Param('id') id: string,
    @Body('id_cliente') id_cliente: string
  ) {
    return this.mascotaService.adoptar(id, id_cliente);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotaService.remove(id);
  }
}
