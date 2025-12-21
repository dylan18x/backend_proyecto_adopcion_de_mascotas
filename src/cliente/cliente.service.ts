import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async findAll(options: IPaginationOptions):Promise<Pagination<Cliente>> {
    const queryBuilder = this.clienteRepository.createQueryBuilder('cliente');
    queryBuilder.orderBy('cliente.nombre', 'ASC');
    return paginate<Cliente>(queryBuilder, options);
  }


  findOne(id: string) {
    return this.clienteRepository.findOne({ where: { id } });
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) return null;

    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: string) {
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) return null;

    return this.clienteRepository.remove(cliente);
  }
}
