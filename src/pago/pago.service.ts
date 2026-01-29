import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ) {}

  async create(dto: CreatePagoDto) {
    const nuevoPago = this.pagoRepository.create({
      fecha: dto.fecha ? new Date(dto.fecha) : new Date(),
      monto: dto.monto,
      metodo_pago: dto.metodo_pago,
      username_donante: dto.username_donante || 'anonimo',
    });

    const guardado = await this.pagoRepository.save(nuevoPago);
    return this.findOne(guardado.id_pago);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Pago>> {
    const queryBuilder = this.pagoRepository.createQueryBuilder('pago');
    queryBuilder
      .orderBy('pago.fecha', 'DESC');
      
    return paginate<Pago>(queryBuilder, options);
  }

  async findOne(id: string) {
    const pago = await this.pagoRepository.findOne({ 
      where: { id_pago: id },
      relations: ['usuario'] // Cargamos la relación del usuario (donante)
    });
    
    if (!pago) throw new NotFoundException(`El pago no existe`);
    return pago;
  }

  async update(id: string, dto: UpdatePagoDto) {
    const pago = await this.findOne(id);

    if (dto.monto !== undefined) pago.monto = dto.monto;
    if (dto.metodo_pago) pago.metodo_pago = dto.metodo_pago;
    if (dto.fecha) pago.fecha = new Date(dto.fecha);
    
    if (dto.username_donante) {
      pago.username_donante = dto.username_donante;
    }

    await this.pagoRepository.save(pago);
    return this.findOne(id); 
  }

  async remove(id: string) {
    const pago = await this.findOne(id);
    return await this.pagoRepository.remove(pago);
  }
}