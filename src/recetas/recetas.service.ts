import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receta } from './receta.entity';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,
  ) {}

  async create(createRecetaDto: CreateRecetaDto) {
    const receta = this.recetaRepository.create(createRecetaDto);
    const guardada = await this.recetaRepository.save(receta);
    return this.findOne(guardada.id);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Receta>> {
    const queryBuilder = this.recetaRepository.createQueryBuilder('receta');
    
    queryBuilder
      .leftJoinAndSelect('receta.medicamento', 'medicamento')
      .leftJoinAndSelect('receta.consulta', 'consulta')
      .orderBy('receta.id', 'DESC'); 

    return paginate<Receta>(queryBuilder, options);
  }

  async findOne(id: string) {
    const receta = await this.recetaRepository.findOne({ 
      where: { id },
      relations: ['medicamento', 'consulta']
    });
    
    if (!receta) {
      throw new NotFoundException('Receta no encontrada');
    }
    return receta;
  }

  async update(id: string, updateRecetaDto: UpdateRecetaDto) {
    const receta = await this.findOne(id);
    Object.assign(receta, updateRecetaDto);
    const actualizada = await this.recetaRepository.save(receta);
    return this.findOne(actualizada.id);
  }

  async remove(id: string) {
    const receta = await this.findOne(id);
    return this.recetaRepository.remove(receta);
  }
}