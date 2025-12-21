import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { Cliente } from 'src/cliente/cliente.entity';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';


@Injectable()
export class MascotasService {
  remove(id: string) {
      throw new Error('Method not implemented.');
  }
  update(id: string, updateMascotaDto: UpdateMascotaDto) {
      throw new Error('Method not implemented.');
  }
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
  async findAll(options: IPaginationOptions):Promise<Pagination<Mascota>> {
    const queryBuilder = this.mascotaRepository.createQueryBuilder('mascota');
    queryBuilder.orderBy('mascota.nombre', 'ASC'); // Opcional
    return paginate<Mascota>(queryBuilder, options);
  }

  findOne(id: string) {
    return this.mascotaRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });
  }
}
