import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
  ) {}

  async create(createMascotaDto: CreateMascotaDto) {
    const mascota = this.mascotaRepository.create(createMascotaDto);
    return await this.mascotaRepository.save(mascota);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Mascota>> {
    const queryBuilder = this.mascotaRepository.createQueryBuilder('mascota');
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