import { Test, TestingModule } from '@nestjs/testing';
import { FacturaController } from './factura.controller';
import { FacturaService } from './factura.service';

describe('FacturaController', () => {
  let controller: FacturaController;
  let service: FacturaService;

  const mockFacturaData = {
    id_factura: 1,
    numero_factura: 'FAC-001',
    fecha_emision: new Date(),
    monto_total: 150.50,
    estado: 'pagada',
  };

  const mockFacturaService = {
    create: jest.fn().mockResolvedValue(mockFacturaData),
    findAll: jest.fn().mockResolvedValue([mockFacturaData]),
    findOne: jest.fn().mockResolvedValue(mockFacturaData),
    update: jest.fn().mockResolvedValue(mockFacturaData),
    remove: jest.fn().mockResolvedValue(mockFacturaData),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturaController],
      providers: [
        {
          provide: FacturaService,
          useValue: mockFacturaService,
        },
      ],
    }).compile();

    controller = module.get<FacturaController>(FacturaController);
    service = module.get<FacturaService>(FacturaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new factura', async () => {
      const result = await controller.create(mockFacturaData);
      expect(result).toEqual(mockFacturaData);
      expect(service.create).toHaveBeenCalledWith(mockFacturaData);
    });
  });

  describe('findAll', () => {
    it('should return an array of facturas', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockFacturaData]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single factura by id', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockFacturaData);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a factura', async () => {
      const updateData = { estado: 'pendiente' };
      const result = await controller.update(1, updateData);
      expect(result).toEqual(mockFacturaData);
      expect(service.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('remove', () => {
    it('should remove a factura', async () => {
      const result = await controller.remove(1);
      expect(result).toEqual(mockFacturaData);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
