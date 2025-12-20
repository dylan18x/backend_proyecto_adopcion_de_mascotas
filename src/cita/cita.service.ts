import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private citaRepository: Repository<Cita>,
  ) {}

  async create(createDto: CreateCitaDto) {
    const cita = this.citaRepository.create(createDto as any);
    return this.citaRepository.save(cita);
  }

  async findAll(query: any) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.citaRepository.findAndCount({
      take: limit,
      skip,
      order: { creadoEn: 'DESC' },
    });

    return { items, meta: { total, page, limit } };
  }

  async findOne(id: string) {
    const item = await this.citaRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Cita no encontrada');
    return item;
  }

  async update(id: string, updateDto: UpdateCitaDto) {
    const item = await this.findOne(id);
    Object.assign(item, updateDto);
    return this.citaRepository.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.citaRepository.remove(item);
  }
}
