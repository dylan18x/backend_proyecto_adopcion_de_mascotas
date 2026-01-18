import { Test, TestingModule } from '@nestjs/testing';
import { HistorialMedicoController } from './historial_medico.controller';
import { HistorialMedicoService } from './historial_medico.service';

describe('HistorialMedicoController', () => {
  let controller: HistorialMedicoController;
  let service: HistorialMedicoService;

  const mockHistorialData = {
    id_historial: 1,
    fecha_consulta: new Date(),
    diagnostico: 'Alergia',
    tratamiento: 'Antihistamínico',
  };

  const mockHistorialMedicoService = {
    create: jest.fn().mockResolvedValue(mockHistorialData),
    findAll: jest.fn().mockResolvedValue([mockHistorialData]),
    findOne: jest.fn().mockResolvedValue(mockHistorialData),
    update: jest.fn().mockResolvedValue(mockHistorialData),
    remove: jest.fn().mockResolvedValue(mockHistorialData),
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

    controller = module.get<HistorialMedicoController>(HistorialMedicoController);
    service = module.get<HistorialMedicoService>(HistorialMedicoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new historial medico', async () => {
      const result = await controller.create(mockHistorialData);
      expect(result).toEqual(mockHistorialData);
      expect(service.create).toHaveBeenCalledWith(mockHistorialData);
    });
  });

  describe('findAll', () => {
    it('should return an array of historial medico', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockHistorialData]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single historial medico by id', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockHistorialData);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a historial medico', async () => {
      const updateData = { diagnostico: 'Fractura' };
      const result = await controller.update(1, updateData);
      expect(result).toEqual(mockHistorialData);
      expect(service.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('remove', () => {
    it('should remove a historial medico', async () => {
      const result = await controller.remove(1);
      expect(result).toEqual(mockHistorialData);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
