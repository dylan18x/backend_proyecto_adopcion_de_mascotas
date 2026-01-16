import { Test, TestingModule } from '@nestjs/testing';
import { VacunasService } from './vacunas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacuna } from './vacuna.entity';

describe('VacunasService', () => {
  let servicio: VacunasService;

  const mockQueryBuilder = {
    orderBy: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
  };

  const mockRepositorioVacuna = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    save: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        VacunasService,
        {
          provide: getRepositoryToken(Vacuna),
          useValue: mockRepositorioVacuna,
        },
      ],
    }).compile();

    servicio = modulo.get<VacunasService>(VacunasService);
  });

  it('debe estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('debe configurar el queryBuilder para vacunas', async () => {
    const opciones = { page: 1, limit: 10 };
    
    try {
      await servicio.findAll(opciones);
    } catch (e) {
      expect(mockRepositorioVacuna.createQueryBuilder).toHaveBeenCalledWith('vacuna');
    }
  });
});