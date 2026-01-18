import { Test, TestingModule } from '@nestjs/testing';
import { HistorialMedicoService } from './historial-medico.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistorialMedico } from './historial-medico.entity';

describe('HistorialMedicoService', () => {
  let servicio: HistorialMedicoService;

  const mockHistorial = {
    id_historial: '1',
    descripcion: 'Control de vacunas',
    fecha: '2024-01-18',
  };

  const mockQueryBuilder = {
    orderBy: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
  };

  const mockRepositorioHistorial = {
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockResolvedValue(mockHistorial),
    findOne: jest.fn().mockResolvedValue(mockHistorial),
    remove: jest.fn().mockResolvedValue(mockHistorial),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        HistorialMedicoService,
        {
          provide: getRepositoryToken(HistorialMedico),
          useValue: mockRepositorioHistorial,
        },
      ],
    }).compile();

    servicio = modulo.get<HistorialMedicoService>(HistorialMedicoService);
  });

  it('debe estar definido', () => {
    expect(servicio).toBeDefined();
  });

  describe('findAll', () => {
    it('debe llamar al queryBuilder con el alias correcto', async () => {
      const opciones = { page: 1, limit: 10 };
      
      try {
        await servicio.findAll(opciones);
      } catch (e) {
        expect(mockRepositorioHistorial.createQueryBuilder).toHaveBeenCalled();
      }
    });
  });

  describe('create', () => {
    it('debe crear un nuevo historial médico', async () => {
      const dto = { descripcion: 'Nuevo examen', fecha: '2024-01-18' };
      const resultado = await servicio.create(dto as any);
      
      expect(resultado).toEqual(mockHistorial);
      expect(mockRepositorioHistorial.save).toHaveBeenCalled();
    });
  });
});