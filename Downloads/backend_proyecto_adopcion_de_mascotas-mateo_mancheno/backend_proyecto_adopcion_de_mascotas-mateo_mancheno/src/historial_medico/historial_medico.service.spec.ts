import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistorialMedicoService } from './historial_medico.service';
import { HistorialMedico } from './entities/historial_medico.entity';
import { NotFoundException } from '@nestjs/common';

describe('HistorialMedicoService', () => {
  let service: HistorialMedicoService;
  let mockRepository: any;

  const mockHistorialData = {
    id_historial: 1,
    fecha_consulta: new Date(),
    diagnostico: 'Alergia',
    tratamiento: 'Antihistamínico',
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockReturnValue(mockHistorialData),
      save: jest.fn().mockResolvedValue(mockHistorialData),
      find: jest.fn().mockResolvedValue([mockHistorialData]),
      findOne: jest.fn().mockResolvedValue(mockHistorialData),
      remove: jest.fn().mockResolvedValue(mockHistorialData),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistorialMedicoService,
        {
          provide: getRepositoryToken(HistorialMedico),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<HistorialMedicoService>(HistorialMedicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new historial medico', async () => {
      const result = await service.create(mockHistorialData);
      expect(result).toEqual(mockHistorialData);
      expect(mockRepository.create).toHaveBeenCalledWith(mockHistorialData);
      expect(mockRepository.save).toHaveBeenCalledWith(mockHistorialData);
    });
  });

  describe('findAll', () => {
    it('should return an array of historial medico', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockHistorialData]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single historial medico by id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockHistorialData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_historial: 1 },
      });
    });

    it('should throw NotFoundException when historial does not exist', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a historial medico', async () => {
      const updateData = { diagnostico: 'Fractura' };
      const result = await service.update(1, updateData);
      expect(result).toEqual(mockHistorialData);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when historial does not exist', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(
        service.update(999, { diagnostico: 'Test' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a historial medico', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockHistorialData);
      expect(mockRepository.remove).toHaveBeenCalledWith(mockHistorialData);
    });

    it('should throw NotFoundException when historial does not exist', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
