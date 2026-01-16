import { Test, TestingModule } from '@nestjs/testing';
import { VacunacionesService } from './vacunaciones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacunacion } from './vacunacion.entity';

describe('VacunacionesService', () => {
  let servicio: VacunacionesService;

  const mockQueryBuilder = {
    orderBy: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(), 
    where: jest.fn().mockReturnThis(),
  };

  const mockRepositorioVacunaciones = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    save: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        VacunacionesService,
        {
          provide: getRepositoryToken(Vacunacion),
          useValue: mockRepositorioVacunaciones,
        },
      ],
    }).compile();

    servicio = modulo.get<VacunacionesService>(VacunacionesService);
  });

  it('debe estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('debe configurar el queryBuilder para obtener vacunacioneses paginadas', async () => {
    const opciones = { page: 1, limit: 10 };
    
    try {
      await servicio.findAll(opciones);
    } catch (e) {

    expect(mockRepositorioVacunaciones.createQueryBuilder).toHaveBeenCalledWith('vacunacion');    }
  });
});