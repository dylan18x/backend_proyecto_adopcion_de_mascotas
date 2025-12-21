import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veterinario } from './veterinario.entity';
import { CreateVeterinarioDto } from './dto/create-veterinario.dto';
import { UpdateVeterinarioDto } from './dto/update-veterinario.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class VeterinariosService {
  constructor(
    @InjectRepository(Veterinario)
    private readonly veterinarioRepository: Repository<Veterinario>,
  ) {}

  async create(createVeterinarioDto: CreateVeterinarioDto) {
    const veterinario = this.veterinarioRepository.create(createVeterinarioDto);
    return await this.veterinarioRepository.save(veterinario);
  }

  async findAll(options: IPaginationOptions):Promise<Pagination<Veterinario>> {
  const queryBuilder = this.veterinarioRepository.createQueryBuilder('veterinario');
  queryBuilder.orderBy('veterinario.nombre', 'ASC'); 
  return paginate<Veterinario>(queryBuilder, options);
}


  async findOne(id: string) {
    const veterinario = await this.veterinarioRepository.findOne({ where: { id } });
    if (!veterinario) throw new NotFoundException('Veterinario no encontrado');
    return veterinario;
  }

  async update(id: string, updateVeterinarioDto: UpdateVeterinarioDto) {
    const veterinario = await this.findOne(id);
    Object.assign(veterinario, updateVeterinarioDto);
    return await this.veterinarioRepository.save(veterinario);
  }

  async remove(id: string) {
    const veterinario = await this.findOne(id);
    return await this.veterinarioRepository.remove(veterinario);
  }
}