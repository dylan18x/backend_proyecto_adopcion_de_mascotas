import { Injectable } from '@nestjs/common';
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
    queryBuilder.orderBy('vacuna.nombre', 'ASC'); // Opcional
    return paginate<Vacuna>(queryBuilder, options);
  }


  findOne(id: string) {
    return this.vacunaRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateVacunaDto) {
    const vacuna = await this.findOne(id);
    if (!vacuna) return null;

    Object.assign(vacuna, dto);
    return this.vacunaRepository.save(vacuna);
  }

  async remove(id: string) {
    const vacuna = await this.findOne(id);
    if (!vacuna) return null;

    return this.vacunaRepository.remove(vacuna);
  }
}
