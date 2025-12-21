import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialMedico } from './entities/historial_medico.entity';

@Injectable()
export class HistorialMedicoService {
  constructor(
    @InjectRepository(HistorialMedico)
    private historialRepository: Repository<HistorialMedico>,
  ) {}

  create(data: Partial<HistorialMedico>) {
    const historial = this.historialRepository.create(data);
    return this.historialRepository.save(historial);
  }

  findAll() {
    return this.historialRepository.find();
  }
}
