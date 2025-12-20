import { Controller, Post, Body, Get } from '@nestjs/common';
import { FacturaService } from './factura.service';

@Controller('facturas')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  create(@Body() body) {
    return this.facturaService.create(body);
  }

  @Get()
  findAll() {
    return this.facturaService.findAll();
  }
}
