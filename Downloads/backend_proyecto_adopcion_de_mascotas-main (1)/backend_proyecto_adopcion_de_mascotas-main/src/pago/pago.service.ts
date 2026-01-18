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
    const nuevoPago = this.pagoRepository.create(dto);
    return await this.pagoRepository.save(nuevoPago);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Pago>> {
    const queryBuilder = this.pagoRepository.createQueryBuilder('pago');
    queryBuilder.orderBy('pago.fecha', 'DESC');
    return paginate<Pago>(queryBuilder, options);
  }

  async findOne(id: string) {
    const pago = await this.pagoRepository.findOne({ 
      where: { id_pago: id },
      relations: ['cliente'] 
    });
    if (!pago) throw new NotFoundException('Pago no encontrado');
    return pago;
  }

  async update(id: string, dto: UpdatePagoDto) {
    const pago = await this.pagoRepository.preload({
      id_pago: id,
      ...dto,
    });
    if (!pago) throw new NotFoundException('Pago no existe');
    return await this.pagoRepository.save(pago);
  }

  async remove(id: string) {
    const pago = await this.findOne(id);
    return await this.pagoRepository.remove(pago);
  }
}