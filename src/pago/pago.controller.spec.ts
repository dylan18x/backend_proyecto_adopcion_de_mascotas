import { Test, TestingModule } from '@nestjs/testing';
import { PagosController } from './pago.controller';
import { PagosService } from './pago.service';
import { Pago } from './pago.entity';

describe('PagosController', () => {
  let controller: PagosController;
  let mockService: any;

  const mockPago: any = {
    id_pago: '1', 
    fecha: '2024-01-18',
    monto: 100.50,
    metodo_pago: 'Tarjeta de Crédito',
  };

  beforeEach(async () => {
    mockService = {
      create: jest.fn().mockResolvedValue(mockPago),
      findAll: jest.fn().mockResolvedValue([mockPago]),
      findOne: jest.fn().mockResolvedValue(mockPago),
      update: jest.fn().mockResolvedValue({ affected: 1 }),
      remove: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosController],
      providers: [
        {
          provide: PagosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PagosController>(PagosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pago', async () => {
      const body = {
        fecha: '2024-01-18',
        monto: 100.50,
        metodo_pago: 'Tarjeta de Crédito',
      };

      const result = await controller.create(body as any);

      expect(mockService.create).toHaveBeenCalledWith(body);
      expect(result).toEqual(mockPago);
    });
  });

  describe('findAll', () => {
    it('should return an array of pagos', async () => {
      const result = await controller.findAll();

      expect(mockService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockPago]);
    });
  });

  describe('findOne', () => {
    it('should return a single pago by id', async () => {
      const id = '1';
      const result = await controller.findOne(id);

      expect(mockService.findOne).toHaveBeenCalledWith(id as any);
      expect(result).toEqual(mockPago);
    });
  });

  describe('update', () => {
    it('should update a pago', async () => {
      const id = '1';
      const body = { monto: 150.75 };

      const result = await controller.update(id, body as any);

      expect(mockService.update).toHaveBeenCalledWith(id as any, body);
      expect(result).toBeDefined();
    });
  });

  describe('remove', () => {
    it('should remove a pago', async () => {
      const id = '1';
      const result = await controller.remove(id);

      expect(mockService.remove).toHaveBeenCalledWith(id as any);
      expect(result).toBeDefined();
    });
  });
});