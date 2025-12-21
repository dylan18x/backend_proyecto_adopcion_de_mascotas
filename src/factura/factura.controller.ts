import { Controller, Post, Body, Get, Query, Put, Param, Delete } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/user.entity';

@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}
  
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateFacturaDto) {
    return this.facturaService.create(dto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.facturaService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturaService.findOne(id);
  }
  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFacturaDto) {
    return this.facturaService.update(id, dto);
  }
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturaService.remove(id);
  }
}