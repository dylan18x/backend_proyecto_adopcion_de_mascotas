import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './cliente.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';

describe('ClientesService', () => {
  let servicio: ClientesService;

  const mockRepositorio = {
    createQueryBuilder: jest.fn().mockReturnValue({
      orderBy: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
    }),
    save: jest.fn().mockImplementation(dto => Promise.resolve({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        { provide: getRepositoryToken(Cliente), useValue: mockRepositorio },
      ],
    }).compile();
    servicio = modulo.get<ClientesService>(ClientesService);
  });

  it('debe estar definido', () => {
    expect(servicio).toBeDefined();
  });
});