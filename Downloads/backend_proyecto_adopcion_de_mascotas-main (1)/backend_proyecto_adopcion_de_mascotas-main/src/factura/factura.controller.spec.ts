import { Test, TestingModule } from '@nestjs/testing';
import { FacturaController } from './factura.controller';
import { FacturaService } from './factura.service';
import { Factura } from './factura.entity';

describe('FacturaController', () => {
  let controller: FacturaController;
  let service: FacturaService;

  const mockFactura: Factura = {
    id_factura: 'factura-1',
    fecha: new Date('2024-01-01'),
    total: 150.50,
    id_pago: 'pago-1',
    pago: null,
  };

  const mockFacturaService = {
    create: jest.fn().mockResolvedValue(mockFactura),
    findAll: jest.fn().mockResolvedValue({
      items: [mockFactura],
      meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
    }),
    findOne: jest.fn().mockResolvedValue(mockFactura),
    update: jest.fn().mockResolvedValue(mockFactura),
    remove: jest.fn().mockResolvedValue(mockFactura),
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new factura', async () => {
      const dto = {
        fecha: '2024-01-01',
        total: 150.50,
        id_pago: 'pago-1',
      };

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockFactura);
    });
  });

  describe('findAll', () => {
    it('should return all facturas with pagination', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('meta');
    });

    it('should apply default pagination values', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a factura by id', async () => {
      const result = await controller.findOne('factura-1');

      expect(service.findOne).toHaveBeenCalledWith('factura-1');
      expect(result).toEqual(mockFactura);
    });
  });

  describe('update', () => {
    it('should update a factura', async () => {
      const dto = { total: 200.00 };

      const result = await controller.update('factura-1', dto);

      expect(service.update).toHaveBeenCalledWith('factura-1', dto);
      expect(result).toEqual(mockFactura);
    });
  });

  describe('remove', () => {
    it('should remove a factura', async () => {
      const result = await controller.remove('factura-1');

      expect(service.remove).toHaveBeenCalledWith('factura-1');
      expect(result).toEqual(mockFactura);
    });
  });
});
