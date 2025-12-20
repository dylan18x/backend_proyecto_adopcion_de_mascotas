import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FacturaService } from './factura.service';
import { Factura } from './entities/factura.entity';

@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  create(@Body() data: Partial<Factura>) {
    return this.facturaService.create(data);
  }

  @Get()
  findAll() {
    return this.facturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facturaService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<Factura>,
  ) {
    return this.facturaService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.facturaService.remove(Number(id));
  }
}
