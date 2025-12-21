import { Injectable } from '@nestjs/common';
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

  create(createVacunacionDto: CreateVacunacionDto) {
    const vacunacion = this.vacunacionRepository.create(createVacunacionDto);
    return this.vacunacionRepository.save(vacunacion);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Vacunacion>>{
    const queryBuilder = this.vacunacionRepository.createQueryBuilder('vacunacion');
    queryBuilder.orderBy('vacunacion.fecha', 'ASC'); // Opcional
    return paginate<Vacunacion>(queryBuilder, options);
  }


  findOne(id: string) {
    return this.vacunacionRepository.findOne({ where: { id } });
  }

  async update(id: string, updateVacunacionDto: UpdateVacunacionDto) {
    const vacunacion = await this.vacunacionRepository.findOne({ where: { id } });
    if (!vacunacion) return null;
    Object.assign(vacunacion, updateVacunacionDto);
    return this.vacunacionRepository.save(vacunacion);
  }

  async remove(id: string) {
    const vacunacion = await this.vacunacionRepository.findOne({ where: { id } });
    if (!vacunacion) return null;
    return this.vacunacionRepository.remove(vacunacion);
  }
}
