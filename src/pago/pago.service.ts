import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,
  ) {}

  create(dto: CreatePagoDto) {
    const pago = this.pagoRepository.create(dto);
    return this.pagoRepository.save(pago);
  }

  findAll() {
    return this.pagoRepository.find();
  }
}
