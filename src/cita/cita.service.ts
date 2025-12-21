import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  create(createCitaDto: CreateCitaDto) {
    const cita = this.citaRepository.create(createCitaDto);
    return this.citaRepository.save(cita);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Cita>> {
    const queryBuilder = this.citaRepository.createQueryBuilder('cita');
    queryBuilder.orderBy('cita.fecha', 'ASC');
    return paginate<Cita>(queryBuilder, options);
  }

  findOne(id: string) {
    return this.citaRepository.findOne({ where: { id_cita: id  } });
  }

  async update(id: string, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citaRepository.findOne({ where: { id_cita: id } });
    if (!cita) return null;

    Object.assign(cita, updateCitaDto);
    return this.citaRepository.save(cita);
  }

  async remove(id: string) {
    const cita = await this.citaRepository.findOne({ where: { id_cita: id } });
    if (!cita) return null;

    return this.citaRepository.remove(cita);
  }
}
