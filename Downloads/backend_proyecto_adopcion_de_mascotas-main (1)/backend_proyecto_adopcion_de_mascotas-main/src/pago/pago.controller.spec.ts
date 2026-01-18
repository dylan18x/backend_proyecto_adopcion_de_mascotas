import { Test, TestingModule } from '@nestjs/testing';
import { PagosController } from './pago.controller';
import { PagosService } from './pago.service';
import { Pago } from './pago.entity';

describe('PagosController', () => {
  let controller: PagosController;
  let service: PagosService;

  const mockPago: Pago = {
    id_pago: 'pago-1',
    fecha: new Date('2024-01-01'),
    monto: 100.00,
    metodo_pago: 'tarjeta',
    id_cliente: 'cliente-1',
    cliente: null,
  };

  const mockPagosService = {
    create: jest.fn().mockResolvedValue(mockPago),
    findAll: jest.fn().mockResolvedValue({
      items: [mockPago],
      meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
    }),
    findOne: jest.fn().mockResolvedValue(mockPago),
    update: jest.fn().mockResolvedValue(mockPago),
    remove: jest.fn().mockResolvedValue(mockPago),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosController],
      providers: [
        {
          provide: PagosService,
          useValue: mockPagosService,
        },
      ],
    }).compile();

    controller = module.get<PagosController>(PagosController);
    service = module.get<PagosService>(PagosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pago', async () => {
      const dto = {
        fecha: '2024-01-01',
        monto: 100.00,
        metodo_pago: 'tarjeta',
        id_cliente: 'cliente-1',
      };

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockPago);
    });
  });

  describe('findAll', () => {
    it('should return all pagos with pagination', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('meta');
    });

    it('should use provided page and limit values', async () => {
      await controller.findAll('2', '20');

      expect(service.findAll).toHaveBeenCalledWith({
        page: 2,
        limit: 20,
      });
    });
  });

  describe('findOne', () => {
    it('should return a pago by id', async () => {
      const result = await controller.findOne('pago-1');

      expect(service.findOne).toHaveBeenCalledWith('pago-1');
      expect(result).toEqual(mockPago);
    });
  });

  describe('update', () => {
    it('should update a pago', async () => {
      const dto = { monto: 150.00 };

      const result = await controller.update('pago-1', dto);

      expect(service.update).toHaveBeenCalledWith('pago-1', dto);
      expect(result).toEqual(mockPago);
    });
  });

  describe('remove', () => {
    it('should remove a pago', async () => {
      const result = await controller.remove('pago-1');

      expect(service.remove).toHaveBeenCalledWith('pago-1');
      expect(result).toEqual(mockPago);
    });
  });
});
