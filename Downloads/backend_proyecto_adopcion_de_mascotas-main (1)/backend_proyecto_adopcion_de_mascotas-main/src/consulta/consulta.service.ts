import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from './consulta.entity';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
  ) {}

  create(createConsultaDto: CreateConsultaDto) {
    const consulta = this.consultaRepository.create(createConsultaDto);
    return this.consultaRepository.save(consulta);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Consulta>> {
    const queryBuilder = this.consultaRepository.createQueryBuilder('consulta');
    queryBuilder.orderBy('consulta.id', 'ASC');
    return paginate<Consulta>(queryBuilder, options);
  }

  async findOne(id: string) {
    const consulta = await this.consultaRepository.findOne({ where: { id } });
    if (!consulta) {
      throw new NotFoundException('Consulta no encontrada');
    }
    return consulta;
  }

  async update(id: string, updateConsultaDto: UpdateConsultaDto) {
    const consulta = await this.findOne(id);
    Object.assign(consulta, updateConsultaDto);
    return this.consultaRepository.save(consulta);
  }

  async remove(id: string) {
    const consulta = await this.findOne(id);
    return this.consultaRepository.remove(consulta);
  }
}
