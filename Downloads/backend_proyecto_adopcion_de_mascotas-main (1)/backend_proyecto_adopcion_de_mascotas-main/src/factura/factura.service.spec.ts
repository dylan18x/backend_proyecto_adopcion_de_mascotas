import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacturaService } from './factura.service';
import { Factura } from './factura.entity';
import { NotFoundException } from '@nestjs/common';

describe('FacturaService', () => {
  let service: FacturaService;
  let repository: Repository<Factura>;

  const mockFactura: Factura = {
    id_factura: 'factura-1',
    fecha: new Date('2024-01-01'),
    total: 150.50,
    id_pago: 'pago-1',
    pago: null,
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockFactura),
    save: jest.fn().mockResolvedValue(mockFactura),
    findOne: jest.fn().mockResolvedValue(mockFactura),
    preload: jest.fn().mockResolvedValue(mockFactura),
    remove: jest.fn().mockResolvedValue(mockFactura),
    createQueryBuilder: jest.fn().mockReturnValue({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacturaService,
        {
          provide: getRepositoryToken(Factura),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FacturaService>(FacturaService);
    repository = module.get<Repository<Factura>>(getRepositoryToken(Factura));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a factura', async () => {
      const dto = {
        fecha: '2024-01-01',
        total: 150.50,
        id_pago: 'pago-1',
      };

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(mockFactura);
      expect(result).toEqual(mockFactura);
    });
  });

  describe('findAll', () => {
    it('should return paginated facturas', async () => {
      const options = { page: 1, limit: 10 };
      const paginatedResult = {
        items: [mockFactura],
        meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(paginatedResult as any);

      const result = await service.findAll(options);

      expect(result).toEqual(paginatedResult);
    });
  });

  describe('findOne', () => {
    it('should return a factura by id', async () => {
      const result = await service.findOne('factura-1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id_factura: 'factura-1' },
        relations: ['pago'],
      });
      expect(result).toEqual(mockFactura);
    });

    it('should throw NotFoundException when factura not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a factura', async () => {
      const dto = { total: 200.00 };

      const result = await service.update('factura-1', dto);

      expect(repository.preload).toHaveBeenCalledWith({
        id_factura: 'factura-1',
        ...dto,
      });
      expect(repository.save).toHaveBeenCalledWith(mockFactura);
      expect(result).toEqual(mockFactura);
    });

    it('should throw NotFoundException when trying to update non-existent factura', async () => {
      mockRepository.preload.mockResolvedValueOnce(null);

      await expect(service.update('invalid-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a factura', async () => {
      const result = await service.remove('factura-1');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id_factura: 'factura-1' },
        relations: ['pago'],
      });
      expect(repository.remove).toHaveBeenCalledWith(mockFactura);
      expect(result).toEqual(mockFactura);
    });

    it('should throw NotFoundException when trying to remove non-existent factura', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.remove('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
