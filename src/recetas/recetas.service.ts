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

  create(createRecetaDto: CreateRecetaDto) {
    const receta = this.recetaRepository.create(createRecetaDto);
    return this.recetaRepository.save(receta);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Receta>> {
    const queryBuilder = this.recetaRepository.createQueryBuilder('receta');
    queryBuilder.orderBy('receta.dosis', 'ASC');
    return paginate<Receta>(queryBuilder, options);
  }

  async findOne(id: string) {
    const receta = await this.recetaRepository.findOne({ where: { id } });
    if (!receta) {
      throw new NotFoundException('Receta no encontrada');
    }
    return receta;
  }

  async update(id: string, updateRecetaDto: UpdateRecetaDto) {
    const receta = await this.findOne(id);
    Object.assign(receta, updateRecetaDto);
    return this.recetaRepository.save(receta);
  }

  async remove(id: string) {
    const receta = await this.findOne(id);
    return this.recetaRepository.remove(receta);
  }
}
