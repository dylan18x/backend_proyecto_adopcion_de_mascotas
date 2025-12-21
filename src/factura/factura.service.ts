import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
  ) {}

  async create(dto: CreateFacturaDto) {
    const nuevaFactura = this.facturaRepository.create(dto);
    return await this.facturaRepository.save(nuevaFactura);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Factura>> {
    const queryBuilder = this.facturaRepository.createQueryBuilder('factura');
    queryBuilder.leftJoinAndSelect('factura.pago', 'pago');
    queryBuilder.orderBy('factura.fecha', 'DESC');
    return paginate<Factura>(queryBuilder, options);
  }

  async findOne(id: string) {
    const factura = await this.facturaRepository.findOne({ 
      where: { id_factura: id },
      relations: ['pago'] 
    });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }

  async update(id: string, dto: UpdateFacturaDto) {
    const factura = await this.facturaRepository.preload({
      id_factura: id,
      ...dto,
    });
    if (!factura) throw new NotFoundException('La factura no existe');
    return await this.facturaRepository.save(factura);
  }

  async remove(id: string) {
    const factura = await this.findOne(id);
    return await this.facturaRepository.remove(factura);
  }
}