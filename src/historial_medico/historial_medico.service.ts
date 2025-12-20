import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialMedico } from './entities/historial_medico.entity';

@Injectable()
export class HistorialMedicoService {
  constructor(
    @InjectRepository(HistorialMedico)
    private historialRepo: Repository<HistorialMedico>,
  ) {}

  // POST
  create(data: Partial<HistorialMedico>) {
    const historial = this.historialRepo.create(data);
    return this.historialRepo.save(historial);
  }

  // GET
  findAll() {
    return this.historialRepo.find();
  }

  // GET BY ID
  async findOne(id: number) {
    const historial = await this.historialRepo.findOne({
      where: { id_historial: id },
    });

    if (!historial) {
      throw new NotFoundException(`Historial médico con id ${id} no encontrado`);
    }

    return historial;
  }

  // PUT
  async update(id: number, data: Partial<HistorialMedico>) {
    const historial = await this.findOne(id);
    Object.assign(historial, data);
    return this.historialRepo.save(historial);
  }

  // DELETE
  async remove(id: number) {
    const historial = await this.findOne(id);
    return this.historialRepo.remove(historial);
  }
}
