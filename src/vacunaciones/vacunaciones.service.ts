import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacunacion } from './vacunacion.entity';
import { CreateVacunacionDto } from './dto/create-vacunacion.dto';
import { UpdateVacunacionDto } from './dto/update-vacunacion.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class VacunacionesService {
  constructor(
    @InjectRepository(Vacunacion)
    private readonly vacunacionRepository: Repository<Vacunacion>,
  ) {}

  async create(dto: CreateVacunacionDto) {
    const nueva = this.vacunacionRepository.create({
      fecha: dto.fecha,
      mascota: { id: dto.mascotaId } as any,
      vacuna: { id: dto.vacunaId } as any,
    });
    const guardada = await this.vacunacionRepository.save(nueva);
    return this.findOne(guardada.id);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Vacunacion>> {
    const queryBuilder = this.vacunacionRepository.createQueryBuilder('v');
    queryBuilder
      .leftJoinAndSelect('v.mascota', 'mascota')
      .leftJoinAndSelect('v.vacuna', 'vacuna')
      .orderBy('v.fecha', 'DESC');

    return paginate<Vacunacion>(queryBuilder, options);
  }

  async findOne(id: string) {
    const registro = await this.vacunacionRepository.findOne({ 
      where: { id },
      relations: ['mascota', 'vacuna'] 
    });
    if (!registro) throw new NotFoundException('Vacunación no encontrada');
    return registro;
  }

  async update(id: string, dto: UpdateVacunacionDto) {
    const registro = await this.findOne(id); 

    if (dto.mascotaId) registro.mascota = { id: dto.mascotaId } as any;
    if (dto.vacunaId) registro.vacuna = { id: dto.vacunaId } as any;
    if (dto.fecha) registro.fecha = dto.fecha;

    await this.vacunacionRepository.save(registro);
    return this.findOne(id);
  }

  async remove(id: string) {
    const registro = await this.findOne(id); 
    return this.vacunacionRepository.remove(registro);
  }
}