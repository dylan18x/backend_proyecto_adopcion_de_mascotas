import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepo: Repository<Factura>,
  ) {}

  // POST
  create(data: Partial<Factura>) {
    const factura = this.facturaRepo.create(data);
    return this.facturaRepo.save(factura);
  }

  // GET ALL
  findAll() {
    return this.facturaRepo.find();
  }

  // GET BY ID
  async findOne(id: number) {
    const factura = await this.facturaRepo.findOne({
      where: { id_factura: id },
    });

    if (!factura) {
      throw new NotFoundException(`Factura con id ${id} no encontrada`);
    }

    return factura;
  }

  // PUT
  async update(id: number, data: Partial<Factura>) {
    const factura = await this.findOne(id);
    Object.assign(factura, data);
    return this.facturaRepo.save(factura);
  }

  // DELETE
  async remove(id: number) {
    const factura = await this.findOne(id);
    return this.facturaRepo.remove(factura);
  }
}
