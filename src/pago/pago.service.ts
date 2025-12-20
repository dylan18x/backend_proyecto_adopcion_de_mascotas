import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';


@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,
  ) {}

  create(data: Partial<Pago>) {
    const pago = this.pagoRepo.create(data);
    return this.pagoRepo.save(pago);
  }

  findAll() {
    return this.pagoRepo.find();
  }

  findOne(id: number) {
    return this.pagoRepo.findOneBy({ id_pago: id });
  }

  update(id: number, data: Partial<Pago>) {
    return this.pagoRepo.update(id, data);
  }

  remove(id: number) {
    return this.pagoRepo.delete(id);
  }
}
