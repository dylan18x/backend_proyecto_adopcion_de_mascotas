import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialMedico } from './historial-medico.entity';
import { CreateHistorialMedicoDto } from './dto/create-historial-medico.dto';
import { UpdateHistorialMedicoDto } from './dto/update-historial-medico.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class HistorialMedicoService {
  constructor(
    @InjectRepository(HistorialMedico)
    private readonly historialRepository: Repository<HistorialMedico>,
  ) {}

  async create(dto: CreateHistorialMedicoDto) {
    const nuevo = this.historialRepository.create(dto);
    return await this.historialRepository.save(nuevo);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<HistorialMedico>> {
    const queryBuilder = this.historialRepository.createQueryBuilder('historial');
    queryBuilder.orderBy('historial.fecha', 'ASC');
    return paginate<HistorialMedico>(queryBuilder, options);
  }

  async findOne(id: string) {
    const registro = await this.historialRepository.findOne({
      where: { id_historial: id },
      relations: ['mascota']
    });
    if (!registro) throw new NotFoundException('Historial no encontrado');
    return registro;
  }

  async update(id: string, dto: UpdateHistorialMedicoDto) {
    const registro = await this.historialRepository.preload({
      id_historial: id,
      ...dto,
    });
    if (!registro) throw new NotFoundException('El historial no existe');
    return await this.historialRepository.save(registro);
  }

  async remove(id: string) {
    const registro = await this.findOne(id);
    return await this.historialRepository.remove(registro);
  }
}