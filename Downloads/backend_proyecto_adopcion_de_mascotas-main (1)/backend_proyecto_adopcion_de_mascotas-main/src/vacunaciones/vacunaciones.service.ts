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

  create(createVacunacionDto: CreateVacunacionDto) {
    const vacunacion = this.vacunacionRepository.create(createVacunacionDto);
    return this.vacunacionRepository.save(vacunacion);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Vacunacion>> {
    const queryBuilder = this.vacunacionRepository.createQueryBuilder('vacunacion');
    queryBuilder.orderBy('vacunacion.fecha', 'ASC');
    return paginate<Vacunacion>(queryBuilder, options);
  }

  async findOne(id: string) {
    const vacunacion = await this.vacunacionRepository.findOne({ where: { id } });
    if (!vacunacion) {
      throw new NotFoundException('Vacunación no encontrada');
    }
    return vacunacion;
  }

  async update(id: string, updateVacunacionDto: UpdateVacunacionDto) {
    const vacunacion = await this.findOne(id); 
    Object.assign(vacunacion, updateVacunacionDto);
    return this.vacunacionRepository.save(vacunacion);
  }

  async remove(id: string) {
    const vacunacion = await this.findOne(id); 
    return this.vacunacionRepository.remove(vacunacion);
  }
}
