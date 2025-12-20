import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>,
  ) {}

  create(data: Partial<Factura>) {
    const factura = this.facturaRepository.create(data);
    return this.facturaRepository.save(factura);
  }

  findAll() {
    return this.facturaRepository.find();
  }
}
