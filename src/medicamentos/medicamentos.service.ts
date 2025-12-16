import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from './medicamento.entity';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Injectable()
export class MedicamentosService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly repo: Repository<Medicamento>,
  ) {}

  create(dto: CreateMedicamentoDto) {
    const m = this.repo.create(dto as any);
    return this.repo.save(m);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateMedicamentoDto) {
    const m = await this.repo.findOne({ where: { id } });
    if (!m) return null;
    Object.assign(m, dto);
    return this.repo.save(m);
  }

  async remove(id: string) {
    const m = await this.repo.findOne({ where: { id } });
    if (!m) return null;
    return this.repo.remove(m);
  }
}
