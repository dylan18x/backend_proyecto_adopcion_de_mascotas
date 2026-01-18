import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagosService } from './pago.service';
import { Pago } from './pago.entity';
import { NotFoundException } from '@nestjs/common';

describe('PagosService', () => {
  let service: PagosService;
  let repository: Repository<Pago>;

  const mockPago: Pago = {
    id_pago: 'pago-1',
    fecha: new Date('2024-01-01'),
    monto: 100.00,
    metodo_pago: 'tarjeta',
    id_cliente: 'cliente-1',
    cliente: null,
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockPago),
    save: jest.fn().mockResolvedValue(mockPago),
    findOne: jest.fn().mockResolvedValue(mockPago),
    preload: jest.fn().mockResolvedValue(mockPago),
    remove: jest.fn().mockResolvedValue(mockPago),
    createQueryBuilder: jest.fn().mockReturnValue({
      orderBy: jest.fn().mockReturnThis(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagosService,
        {
          provide: getRepositoryToken(Pago),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PagosService>(PagosService);
    repository = module.get<Repository<Pago>>(getRepositoryToken(Pago));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a pago', async () => {
      const dto = {
        fecha: '2024-01-01',
        monto: 100.00,
        metodo_pago: 'tarjeta',
        id_cliente: 'cliente-1',
      };

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(mockPago);
      expect(result).toEqual(mockPago);
    });
  });

  describe('findAll', () => {
    it('should return paginated pagos', async () => {
      const options = { page: 1, limit: 10 };
      const paginatedResult = {
        items: [mockPago],
        meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(paginatedResult as any);

      const result = await service.findAll(options);

      expect(result).toEqual(paginatedResult);
    });
  });

  describe('findOne', () => {
    it('should return a pago by id', async () => {
      const result = await service.findOne('pago-1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id_pago: 'pago-1' },
        relations: ['cliente'],
      });
      expect(result).toEqual(mockPago);
    });

    it('should throw NotFoundException when pago not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a pago', async () => {
      const dto = { monto: 150.00 };

      const result = await service.update('pago-1', dto);

      expect(repository.preload).toHaveBeenCalledWith({
        id_pago: 'pago-1',
        ...dto,
      });
      expect(repository.save).toHaveBeenCalledWith(mockPago);
      expect(result).toEqual(mockPago);
    });

    it('should throw NotFoundException when trying to update non-existent pago', async () => {
      mockRepository.preload.mockResolvedValueOnce(null);

      await expect(service.update('invalid-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a pago', async () => {
      const result = await service.remove('pago-1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id_pago: 'pago-1' },
        relations: ['cliente'],
      });
      expect(repository.remove).toHaveBeenCalledWith(mockPago);
      expect(result).toEqual(mockPago);
    });

    it('should throw NotFoundException when trying to remove non-existent pago', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.remove('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
