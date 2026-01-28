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

  async create(createDto: CreateConsultaDto): Promise<Consulta> {
    const nueva = this.consultaRepository.create(createDto);
    const guardada = await this.consultaRepository.save(nueva);
    return this.findOne(guardada.id); 
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Consulta>> {
    const qb = this.consultaRepository.createQueryBuilder('consulta');
    qb.leftJoinAndSelect('consulta.cita', 'cita') 
      .leftJoinAndSelect('cita.mascota', 'mascota') 
      .orderBy('consulta.id', 'DESC');

    return paginate<Consulta>(qb, options);
  }

  async findOne(id: string): Promise<Consulta> {
    const consulta = await this.consultaRepository.findOne({
      where: { id }, 
      relations: ['cita', 'cita.mascota'], 
    });
    if (!consulta) throw new NotFoundException(`Consulta ${id} no encontrada`);
    return consulta;
  }

  async update(id: string, updateDto: UpdateConsultaDto): Promise<Consulta> {
    await this.consultaRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const consulta = await this.findOne(id);
    return await this.consultaRepository.remove(consulta);
  }
}