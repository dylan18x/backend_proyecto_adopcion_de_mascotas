import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PagoService } from './pago.service';
import { Pago } from './entities/pago.entity';

describe('PagoService', () => {
  let service: PagoService;
  let mockRepository: any;

  const mockPagoData = {
    id_pago: 1,
    monto: 100.50,
    fecha_pago: new Date(),
    metodo_pago: 'tarjeta',
    estado: 'completado',
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn().mockReturnValue(mockPagoData),
      save: jest.fn().mockResolvedValue(mockPagoData),
      find: jest.fn().mockResolvedValue([mockPagoData]),
      findOneBy: jest.fn().mockResolvedValue(mockPagoData),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagoService,
        {
          provide: getRepositoryToken(Pago),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PagoService>(PagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pago', async () => {
      const result = await service.create(mockPagoData);
      expect(result).toEqual(mockPagoData);
      expect(mockRepository.create).toHaveBeenCalledWith(mockPagoData);
      expect(mockRepository.save).toHaveBeenCalledWith(mockPagoData);
    });
  });

  describe('findAll', () => {
    it('should return an array of pagos', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockPagoData]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single pago by id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockPagoData);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id_pago: 1 });
    });

    it('should return null when pago does not exist', async () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a pago', async () => {
      const updateData = { estado: 'pendiente' };
      const result = await service.update(1, updateData);
      expect(result).toEqual({ affected: 1 });
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('remove', () => {
    it('should remove a pago', async () => {
      const result = await service.remove(1);
      expect(result).toEqual({ affected: 1 });
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
