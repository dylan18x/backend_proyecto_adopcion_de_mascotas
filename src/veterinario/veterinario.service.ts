import { Injectable } from '@nestjs/common';
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

  create(createVeterinarioDto: CreateVeterinarioDto) {
    const veterinario = this.veterinarioRepository.create(createVeterinarioDto);
    return this.veterinarioRepository.save(veterinario);
  }

  async findAll(options: IPaginationOptions):Promise<Pagination<Veterinario>> {
  const queryBuilder = this.veterinarioRepository.createQueryBuilder('veterinario');
  queryBuilder.orderBy('veterinario.nombre', 'ASC'); // Opcional
  return paginate<Veterinario>(queryBuilder, options);
}


  findOne(id: string) {
    return this.veterinarioRepository.findOne({ where: { id } });
  }

  async update(id: string, updateVeterinarioDto: UpdateVeterinarioDto) {
    const veterinario = await this.veterinarioRepository.findOne({ where: { id } });
    if (!veterinario) return null;

    Object.assign(veterinario, updateVeterinarioDto);
    return this.veterinarioRepository.save(veterinario);
  }

  async remove(id: string) {
    const veterinario = await this.veterinarioRepository.findOne({ where: { id } });
    if (!veterinario) return null;

    return this.veterinarioRepository.remove(veterinario);
  }
}
