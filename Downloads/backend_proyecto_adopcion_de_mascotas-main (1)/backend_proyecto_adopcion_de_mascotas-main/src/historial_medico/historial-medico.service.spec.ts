import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialMedicoService } from './historial-medico.service';
import { HistorialMedico } from './historial-medico.entity';
import { NotFoundException } from '@nestjs/common';

describe('HistorialMedicoService', () => {
  let service: HistorialMedicoService;
  let repository: Repository<HistorialMedico>;

  const mockHistorialMedico: HistorialMedico = {
    id_historial: '1',
    fecha: new Date('2024-01-01'),
    descripcion: 'Consulta general',
    id_mascota: 'mascota-1',
    mascota: null,
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockHistorialMedico),
    save: jest.fn().mockResolvedValue(mockHistorialMedico),
    findOne: jest.fn().mockResolvedValue(mockHistorialMedico),
    preload: jest.fn().mockResolvedValue(mockHistorialMedico),
    remove: jest.fn().mockResolvedValue(mockHistorialMedico),
    createQueryBuilder: jest.fn().mockReturnValue({
      orderBy: jest.fn().mockReturnThis(),
    }),
  };

  beforeEach(async () => {
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
    repository = module.get<Repository<HistorialMedico>>(
      getRepositoryToken(HistorialMedico),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a historial medico', async () => {
      const dto = {
        fecha: '2024-01-01',
        descripcion: 'Consulta general',
        id_mascota: 'mascota-1',
      };

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(mockHistorialMedico);
      expect(result).toEqual(mockHistorialMedico);
    });
  });

  describe('findAll', () => {
    it('should return paginated historials', async () => {
      const options = { page: 1, limit: 10 };
      const paginatedResult = {
        items: [mockHistorialMedico],
        meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(paginatedResult as any);

      const result = await service.findAll(options);

      expect(result).toEqual(paginatedResult);
    });
  });

  describe('findOne', () => {
    it('should return a historial medico by id', async () => {
      const result = await service.findOne('1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id_historial: '1' },
        relations: ['mascota'],
      });
      expect(result).toEqual(mockHistorialMedico);
    });

    it('should throw NotFoundException when historial not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a historial medico', async () => {
      const dto = { descripcion: 'Consulta actualizada' };

      const result = await service.update('1', dto);

      expect(repository.preload).toHaveBeenCalledWith({
        id_historial: '1',
        ...dto,
      });
      expect(repository.save).toHaveBeenCalledWith(mockHistorialMedico);
      expect(result).toEqual(mockHistorialMedico);
    });

    it('should throw NotFoundException when trying to update non-existent historial', async () => {
      mockRepository.preload.mockResolvedValueOnce(null);

      await expect(service.update('invalid-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a historial medico', async () => {
      const result = await service.remove('1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id_historial: '1' },
        relations: ['mascota'],
      });
      expect(repository.remove).toHaveBeenCalledWith(mockHistorialMedico);
      expect(result).toEqual(mockHistorialMedico);
    });

    it('should throw NotFoundException when trying to remove non-existent historial', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.remove('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
