import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './cita.entity';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  create(createCitaDto: CreateCitaDto) {
    const cita = this.citaRepository.create(createCitaDto);
    return this.citaRepository.save(cita);
  }

  findAll() {
    return this.citaRepository.find();
  }

  findOne(id: string) {
    return this.citaRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCitaDto: UpdateCitaDto) {
    const cita = await this.citaRepository.findOne({ where: { id } });
    if (!cita) return null;
    Object.assign(cita, updateCitaDto);
    return this.citaRepository.save(cita);
  }

  async remove(id: string) {
    const cita = await this.citaRepository.findOne({ where: { id } });
    if (!cita) return null;
    return this.citaRepository.remove(cita);
  }
}
