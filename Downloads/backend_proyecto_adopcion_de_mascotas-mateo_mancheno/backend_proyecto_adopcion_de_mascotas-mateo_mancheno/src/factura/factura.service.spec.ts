import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FacturaService } from './factura.service';
import { Factura } from './entities/factura.entity';
import { NotFoundException } from '@nestjs/common';

describe('FacturaService', () => {
  let service: FacturaService;
  let mockRepository: any;

  const mockFacturaData = {
    id_factura: 1,
    numero_factura: 'FAC-001',
    fecha_emision: new Date(),
    monto_total: 150.50,
    estado: 'pagada',
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockReturnValue(mockFacturaData),
      save: jest.fn().mockResolvedValue(mockFacturaData),
      find: jest.fn().mockResolvedValue([mockFacturaData]),
      findOne: jest.fn().mockResolvedValue(mockFacturaData),
      remove: jest.fn().mockResolvedValue(mockFacturaData),
    };

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new factura', async () => {
      const result = await service.create(mockFacturaData);
      expect(result).toEqual(mockFacturaData);
      expect(mockRepository.create).toHaveBeenCalledWith(mockFacturaData);
      expect(mockRepository.save).toHaveBeenCalledWith(mockFacturaData);
    });
  });

  describe('findAll', () => {
    it('should return an array of facturas', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockFacturaData]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single factura by id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockFacturaData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_factura: 1 },
      });
    });

    it('should throw NotFoundException when factura does not exist', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a factura', async () => {
      const updateData = { estado: 'pendiente' };
      const result = await service.update(1, updateData);
      expect(result).toEqual(mockFacturaData);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when factura does not exist', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(
        service.update(999, { estado: 'pendiente' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a factura', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockFacturaData);
      expect(mockRepository.remove).toHaveBeenCalledWith(mockFacturaData);
    });

    it('should throw NotFoundException when factura does not exist', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
