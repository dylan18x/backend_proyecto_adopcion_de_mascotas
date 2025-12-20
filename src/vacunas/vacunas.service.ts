import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacuna } from './vacuna.entity';
import { CreateVacunaDto } from './dto/create-vacuna.dto';
import { UpdateVacunaDto } from './dto/update-vacuna.dto';

@Injectable()
export class VacunasService {
  constructor(
    @InjectRepository(Vacuna)
    private readonly vacunaRepository: Repository<Vacuna>,
  ) {}

  create(createVacunaDto: CreateVacunaDto) {
    const vacuna = this.vacunaRepository.create(createVacunaDto);
    return this.vacunaRepository.save(vacuna);
  }

  findAll() {
    return this.vacunaRepository.find();
  }

  findOne(id: string) {
    return this.vacunaRepository.findOne({ where: { id } });
  }

  async update(id: string, updateVacunaDto: UpdateVacunaDto) {
    const vacuna = await this.vacunaRepository.findOne({ where: { id } });
    if (!vacuna) return null;
    Object.assign(vacuna, updateVacunaDto);
    return this.vacunaRepository.save(vacuna);
  }

  async remove(id: string) {
    const vacuna = await this.vacunaRepository.findOne({ where: { id } });
    if (!vacuna) return null;
    return this.vacunaRepository.remove(vacuna);
  }
}
