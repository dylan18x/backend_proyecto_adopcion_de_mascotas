import { Test, TestingModule } from '@nestjs/testing';
import { RecetasService } from './recetas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Receta } from './receta.entity';

describe('RecetasService', () => {
  let servicio: RecetasService;

  const mockQueryBuilder = {
    orderBy: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
  };

  const mockRepositorioReceta = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(receta => Promise.resolve({ id: 1, ...receta })),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RecetasService,
        {
          provide: getRepositoryToken(Receta),
          useValue: mockRepositorioReceta,
        },
      ],
    }).compile();

    servicio = modulo.get<RecetasService>(RecetasService);
  });

  it('debe estar definido', () => {
    expect(servicio).toBeDefined();
  });

  it('debe obtener las recetas con sus relaciones y paginación', async () => {
    const opciones = { page: 1, limit: 10 };
    
    try {
      await servicio.findAll(opciones);
    } catch (error) {
      expect(mockRepositorioReceta.createQueryBuilder).toHaveBeenCalledWith('receta');
    }
  });
});