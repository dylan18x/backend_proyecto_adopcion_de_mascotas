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
      fecha: new Date(dto.fecha), 
      monto: dto.monto,
      metodo_pago: dto.metodo_pago,
      cliente: { id: dto.id_cliente } as any, // Vinculamos por ID
    });
    
    const guardado = await this.pagoRepository.save(nuevoPago);
    // IMPORTANTE: Refrescar para traer el 'nombre' del cliente
    return this.findOne(guardado.id_pago);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Pago>> {
    const queryBuilder = this.pagoRepository.createQueryBuilder('pago');
    queryBuilder
      .leftJoinAndSelect('pago.cliente', 'cliente') // Carga la relación cliente
      .orderBy('pago.fecha', 'DESC');
      
    return paginate<Pago>(queryBuilder, options);
  }

  async findOne(id: string) {
    const pago = await this.pagoRepository.findOne({ 
      where: { id_pago: id },
      relations: ['cliente'] 
    });
    
    if (!pago) throw new NotFoundException(`El pago no existe`);
    return pago;
  }

  async update(id: string, dto: UpdatePagoDto) {
    const pago = await this.findOne(id);

    if (dto.monto !== undefined) pago.monto = dto.monto;
    if (dto.metodo_pago) pago.metodo_pago = dto.metodo_pago;
    if (dto.fecha) pago.fecha = new Date(dto.fecha);
    if (dto.id_cliente) pago.cliente = { id: dto.id_cliente } as any;

    await this.pagoRepository.save(pago);
    return this.findOne(id); 
  }

  async remove(id: string) {
    const pago = await this.findOne(id);
    return await this.pagoRepository.remove(pago);
  }
}