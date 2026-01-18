import { Test, TestingModule } from '@nestjs/testing';
import { HistorialMedicoController } from './historial-medico.controller';
import { HistorialMedicoService } from './historial-medico.service';
import { HistorialMedico } from './historial-medico.entity';

describe('HistorialMedicoController', () => {
  let controller: HistorialMedicoController;
  let mockService: any;

  const mockHistorialMedico = {
    id_historial: '1', 
    descripcion: 'Examen general',
    fecha: '2024-01-18',
  };

  beforeEach(async () => {
    mockService = {
      create: jest.fn().mockResolvedValue(mockHistorialMedico),
      findAll: jest.fn().mockResolvedValue([mockHistorialMedico]),
      findOne: jest.fn().mockResolvedValue(mockHistorialMedico),
      update: jest.fn().mockResolvedValue(mockHistorialMedico),
      remove: jest.fn().mockResolvedValue(mockHistorialMedico),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialMedicoController],
      providers: [
        {
          provide: HistorialMedicoService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<HistorialMedicoController>(HistorialMedicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new historial medico', async () => {
      const data = {
        descripcion: 'Examen general',
        fecha: '2024-01-18',
      };

      const result = await controller.create(data as any);

      expect(mockService.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(mockHistorialMedico);
    });
  });

  describe('findOne', () => {
    it('should return a single historial medico by id', async () => {
      const id = '1'; 
      const result = await controller.findOne(id as any);

      expect(mockService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockHistorialMedico);
    });
  });

  describe('update', () => {
    it('should update a historial medico', async () => {
      const id = '1';
      const updateData = {
        descripcion: 'Examen actualizado',
      };

      const result = await controller.update(id as any, updateData as any);

      expect(mockService.update).toHaveBeenCalledWith(id, updateData);
      expect(result).toEqual(mockHistorialMedico);
    });
  });

  describe('remove', () => {
    it('should remove a historial medico', async () => {
      const id = '1';
      const result = await controller.remove(id as any);

      expect(mockService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockHistorialMedico);
    });
  });
});