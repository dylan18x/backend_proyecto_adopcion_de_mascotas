import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Cliente } from '../cliente/cliente.entity';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createMascotaDto: CreateMascotaDto) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: createMascotaDto.id_cliente }, 
    });
    if (!cliente) {
      throw new NotFoundException('Cliente no existe');
    }
    const mascota = this.mascotaRepository.create({
      nombre: createMascotaDto.nombre,
      especie: createMascotaDto.especie,
      raza: createMascotaDto.raza,
      cliente,
    });
    return this.mascotaRepository.save(mascota);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Mascota>> {
    const queryBuilder = this.mascotaRepository.createQueryBuilder('mascota');
    queryBuilder.orderBy('mascota.nombre', 'ASC');
    return paginate<Mascota>(queryBuilder, options);
  }

  async findOne(id: string) {
    const mascota = await this.mascotaRepository.findOne({ where: { id } });
    if (!mascota) throw new NotFoundException('Mascota no encontrada');
    return mascota;
  }

  async update(id: string, updateMascotaDto: UpdateMascotaDto) {
    const mascota = await this.findOne(id);
    Object.assign(mascota, updateMascotaDto);
    return await this.mascotaRepository.save(mascota);
  }

  async remove(id: string) {
    const mascota = await this.findOne(id);
    return await this.mascotaRepository.remove(mascota);
  }
}
