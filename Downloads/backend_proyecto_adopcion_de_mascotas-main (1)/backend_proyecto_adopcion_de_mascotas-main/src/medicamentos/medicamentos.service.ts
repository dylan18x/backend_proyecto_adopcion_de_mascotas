import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

import { Medicamento } from './medicamento.entity';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Injectable()
export class MedicamentosService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly medicamentoRepository: Repository<Medicamento>,
  ) {}

  async create(createDto: CreateMedicamentoDto) {
    const medicamento = this.medicamentoRepository.create(createDto);
    return this.medicamentoRepository.save(medicamento);
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<Medicamento>> {
    const queryBuilder =
      this.medicamentoRepository.createQueryBuilder('medicamento');

    queryBuilder.orderBy('medicamento.nombre', 'ASC');

    return paginate<Medicamento>(queryBuilder, options);
  }

  async findOne(id: string) {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
    });

    if (!medicamento) {
      throw new NotFoundException('Medicamento no encontrado');
    }

    return medicamento;
  }

  async update(id: string, updateDto: UpdateMedicamentoDto) {
    const medicamento = await this.findOne(id);

    Object.assign(medicamento, updateDto);
    return this.medicamentoRepository.save(medicamento);
  }

  async remove(id: string) {
    const medicamento = await this.findOne(id);
    return this.medicamentoRepository.remove(medicamento);
  }
}
