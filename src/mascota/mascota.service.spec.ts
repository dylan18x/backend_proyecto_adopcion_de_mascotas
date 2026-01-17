import { Test, TestingModule } from '@nestjs/testing';
import { MascotasService } from './mascota.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mascota } from './mascota.entity';
import { Cliente } from '../cliente/cliente.entity';

describe('MascotasService', () => {
  let service: MascotasService;

  const mockRepositorio = {
    createQueryBuilder: jest.fn().mockReturnValue({
      orderBy: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MascotasService,
        { provide: getRepositoryToken(Mascota), useValue: mockRepositorio },
        { provide: getRepositoryToken(Cliente), useValue: mockRepositorio },
      ],
    }).compile();

    service = module.get<MascotasService>(MascotasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});