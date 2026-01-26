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

  async create(createVacunacionDto: CreateVacunacionDto) {
    const vacunacion = this.vacunacionRepository.create(createVacunacionDto);
    const guardada = await this.vacunacionRepository.save(vacunacion);
    // Retornamos con relaciones para que Postman muestre los nombres de inmediato
    return this.findOne(guardada.id);
  }

  findAll(options: IPaginationOptions): Promise<Pagination<Vacunacion>> {
    const queryBuilder = this.vacunacionRepository.createQueryBuilder('vacunacion');
    
    // Traemos las relaciones para que el Frontend vea los nombres
    queryBuilder
      .leftJoinAndSelect('vacunacion.mascota', 'mascota')
      .leftJoinAndSelect('vacunacion.vacuna', 'vacuna')
      .orderBy('vacunacion.fecha', 'ASC');

    return paginate<Vacunacion>(queryBuilder, options);
  }

  async findOne(id: string) {
    const vacunacion = await this.vacunacionRepository.findOne({ 
      where: { id },
      relations: ['mascota', 'vacuna'] 
    });
    
    if (!vacunacion) {
      throw new NotFoundException('Vacunación no encontrada');
    }
    return vacunacion;
  }

  // MÉTODO UPDATE (El que te marcaba error)
  async update(id: string, updateVacunacionDto: UpdateVacunacionDto) {
    const vacunacion = await this.findOne(id); 
    Object.assign(vacunacion, updateVacunacionDto);
    const actualizada = await this.vacunacionRepository.save(vacunacion);
    return this.findOne(actualizada.id); // Retornamos con relaciones actualizadas
  }

  // MÉTODO REMOVE (El que te marcaba error)
  async remove(id: string) {
    const vacunacion = await this.findOne(id); 
    return this.vacunacionRepository.remove(vacunacion);
  }
}