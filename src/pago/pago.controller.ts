import { Controller, Post, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { PagosService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';
import { Public } from '../auth/public.decorator';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagoService: PagosService) {}

  @Public() 
  @Post()
  create(@Body() dto: CreatePagoDto) {
    return this.pagoService.create(dto);
  }

  @Public()
  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.pagoService.findAll({ page, limit });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagoService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePagoDto) {
    return this.pagoService.update(id, dto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagoService.remove(id);
  }
}