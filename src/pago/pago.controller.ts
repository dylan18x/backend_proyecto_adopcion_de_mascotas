import { Controller, Post, Body, Get } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller('pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  create(@Body() dto: CreatePagoDto) {
    return this.pagoService.create(dto);
  }

  @Get()
  findAll() {
    return this.pagoService.findAll();
  }
}
