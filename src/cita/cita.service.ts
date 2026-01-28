import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createCitaDto: CreateCitaDto): Promise<Cita> {
    const nuevaCita = this.citaRepository.create(createCitaDto);
    const guardada = await this.citaRepository.save(nuevaCita);
    return this.findOne(guardada.id_cita); // Retorna con relaciones
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Cita>> {
    const queryBuilder = this.citaRepository.createQueryBuilder('cita');
    queryBuilder
      .leftJoinAndSelect('cita.mascota', 'mascota')
      .leftJoinAndSelect('cita.veterinario', 'veterinario')
      .orderBy('cita.fecha', 'DESC');

    return paginate<Cita>(queryBuilder, options);
  }

  async findOne(id: string): Promise<Cita> {
    const cita = await this.citaRepository.findOne({
      where: { id_cita: id },
      relations: ['mascota', 'veterinario'],
    });
    if (!cita) throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    return cita;
  }

  async update(id: string, updateCitaDto: UpdateCitaDto): Promise<Cita> {
    await this.citaRepository.update(id, updateCitaDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<Cita> {
    const cita = await this.findOne(id);
    return await this.citaRepository.remove(cita);
  }
}