import { Test, TestingModule } from '@nestjs/testing';
import { VeterinariosService } from './veterinario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Veterinario } from './veterinario.entity';

describe('VeterinariosService', () => {
  let servicio: VeterinariosService;

  const mockRepositorio = {
    createQueryBuilder: jest.fn().mockReturnValue({
      orderBy: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
    }),
    save: jest.fn().mockImplementation(dto => Promise.resolve({ id: 1, ...dto })),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        VeterinariosService,
        { provide: getRepositoryToken(Veterinario), useValue: mockRepositorio },
      ],
    }).compile();

    servicio = modulo.get<VeterinariosService>(VeterinariosService);
  });

  it('debe estar definido', () => {
    expect(servicio).toBeDefined();
  });
});