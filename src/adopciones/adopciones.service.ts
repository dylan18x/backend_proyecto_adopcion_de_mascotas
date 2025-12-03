import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Adopcion } from './adopcion.entity';
import { CreateAdopcionDto } from './dto/create-adopcion.dto';
import { UpdateAdopcionDto } from './dto/update-adopcion.dto';

@Injectable()
export class AdopcionesService {
  constructor(
    @InjectRepository(Adopcion)
    private readonly adopcionRepository: Repository<Adopcion>,
  ) {}

  create(createAdopcionDto: CreateAdopcionDto) {
    const adopcion = this.adopcionRepository.create(createAdopcionDto);
    return this.adopcionRepository.save(adopcion);
  }

  findAll() {
    return this.adopcionRepository.find();
  }

  findOne(id: string) {
    return this.adopcionRepository.findOne({ where: { id } });
  }

  async update(id: string, updateAdopcionDto: UpdateAdopcionDto) {
    const adopcion = await this.adopcionRepository.findOne({ where: { id } });
    if (!adopcion) return null;
    Object.assign(adopcion, updateAdopcionDto);
    return this.adopcionRepository.save(adopcion);
  }

  async remove(id: string) {
    const adopcion = await this.adopcionRepository.findOne({ where: { id } });
    if (!adopcion) return null;
    return this.adopcionRepository.remove(adopcion);
  }
}
