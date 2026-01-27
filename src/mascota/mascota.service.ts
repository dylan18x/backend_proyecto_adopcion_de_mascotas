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
    const mascota = this.mascotaRepository.create({
      nombre: createMascotaDto.nombre,
      especie: createMascotaDto.especie,
      raza: createMascotaDto.raza,
    });

    return this.mascotaRepository.save(mascota);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Mascota>> {
    const qb = this.mascotaRepository.createQueryBuilder('mascota');
    qb.leftJoinAndSelect('mascota.cliente', 'cliente');
    qb.orderBy('mascota.nombre', 'ASC');
    return paginate<Mascota>(qb, options);
  }

  async findOne(id: string) {
    const mascota = await this.mascotaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!mascota) {
      throw new NotFoundException('Mascota no encontrada');
    }

    return mascota;
  }

  async update(id: string, updateMascotaDto: UpdateMascotaDto) {
    const mascota = await this.findOne(id);

    mascota.nombre = updateMascotaDto.nombre;
    mascota.especie = updateMascotaDto.especie;
    mascota.raza = updateMascotaDto.raza;

    return this.mascotaRepository.save(mascota);
  }

  // 🔥 ADOPCIÓN
  async adoptar(id: string, idCliente: string) {
    const mascota = await this.findOne(id);

    const cliente = await this.clienteRepository.findOne({
      where: { id: idCliente },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente no existe');
    }

    mascota.cliente = cliente;
    return this.mascotaRepository.save(mascota);
  }

  async remove(id: string) {
    const mascota = await this.findOne(id);
    return this.mascotaRepository.remove(mascota);
  }
}
