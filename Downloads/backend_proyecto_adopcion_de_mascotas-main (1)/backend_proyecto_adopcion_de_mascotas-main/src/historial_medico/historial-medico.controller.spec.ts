import { Test, TestingModule } from '@nestjs/testing';
import { HistorialMedicoController } from './historial-medico.controller';
import { HistorialMedicoService } from './historial-medico.service';
import { HistorialMedico } from './historial-medico.entity';

describe('HistorialMedicoController', () => {
  let controller: HistorialMedicoController;
  let service: HistorialMedicoService;

  const mockHistorialMedico: HistorialMedico = {
    id_historial: '1',
    fecha: new Date('2024-01-01'),
    descripcion: 'Consulta general',
    id_mascota: 'mascota-1',
    mascota: null,
  };

  const mockHistorialMedicoService = {
    create: jest.fn().mockResolvedValue(mockHistorialMedico),
    findAll: jest.fn().mockResolvedValue({
      items: [mockHistorialMedico],
      meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
    }),
    findOne: jest.fn().mockResolvedValue(mockHistorialMedico),
    update: jest.fn().mockResolvedValue(mockHistorialMedico),
    remove: jest.fn().mockResolvedValue(mockHistorialMedico),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialMedicoController],
      providers: [
        {
          provide: HistorialMedicoService,
          useValue: mockHistorialMedicoService,
        },
      ],
    }).compile();

    controller = module.get<HistorialMedicoController>(
      HistorialMedicoController,
    );
    service = module.get<HistorialMedicoService>(HistorialMedicoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new historial medico', async () => {
      const dto = {
        fecha: '2024-01-01',
        descripcion: 'Consulta general',
        id_mascota: 'mascota-1',
      };

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockHistorialMedico);
    });
  });

  describe('findAll', () => {
    it('should return all historials with pagination', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('meta');
    });

    it('should apply limit constraint (max 100)', async () => {
      await controller.findAll('1', '200');

      expect(service.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 100,
      });
    });
  });

  describe('findOne', () => {
    it('should return a historial medico by id', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockHistorialMedico);
    });
  });

  describe('update', () => {
    it('should update a historial medico', async () => {
      const dto = { descripcion: 'Consulta actualizada' };

      const result = await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith('1', dto);
      expect(result).toEqual(mockHistorialMedico);
    });
  });

  describe('remove', () => {
    it('should remove a historial medico', async () => {
      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockHistorialMedico);
    });
  });
});
