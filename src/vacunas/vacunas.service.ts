import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacuna } from './vacuna.entity';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class VacunasService {
  constructor(
    @InjectRepository(Vacuna)
    private readonly vacunaRepository: Repository<Vacuna>,
  ) {}

  create(dto: CreateVacunaDto) {
    const vacuna = this.vacunaRepository.create(dto);
    return this.vacunaRepository.save(vacuna);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Vacuna>>  {
    const queryBuilder = this.vacunaRepository.createQueryBuilder('vacuna');
    queryBuilder.orderBy('vacuna.nombre', 'ASC'); 
    return paginate<Vacuna>(queryBuilder, options);
  }

  async findOne(id: string) {
    const vacuna = await this.vacunaRepository.findOne({ where: { id } });
    if (!vacuna) {
      throw new NotFoundException('Vacuna no encontrada');
    }
    return vacuna;
  }

  async update(id: string, dto: UpdateVacunaDto) {
    const vacuna = await this.findOne(id); 
    Object.assign(vacuna, dto);
    return this.vacunaRepository.save(vacuna);
  }

  async remove(id: string) {
    const vacuna = await this.findOne(id); // 404
    return this.vacunaRepository.remove(vacuna);
  }
}
