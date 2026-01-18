import { Test, TestingModule } from '@nestjs/testing';
import { PagoController } from './pago.controller';
import { PagoService } from './pago.service';

describe('PagoController', () => {
  let controller: PagoController;
  let service: PagoService;

  const mockPagoData = {
    id_pago: 1,
    monto: 100.50,
    fecha_pago: new Date(),
    metodo_pago: 'tarjeta',
    estado: 'completado',
  };

  const mockPagoService = {
    create: jest.fn().mockResolvedValue(mockPagoData),
    findAll: jest.fn().mockResolvedValue([mockPagoData]),
    findOne: jest.fn().mockResolvedValue(mockPagoData),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagoController],
      providers: [
        {
          provide: PagoService,
          useValue: mockPagoService,
        },
      ],
    }).compile();

    controller = module.get<PagoController>(PagoController);
    service = module.get<PagoService>(PagoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new pago', async () => {
      const result = await controller.create(mockPagoData);
      expect(result).toEqual(mockPagoData);
      expect(service.create).toHaveBeenCalledWith(mockPagoData);
    });
  });

  describe('findAll', () => {
    it('should return an array of pagos', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockPagoData]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single pago by id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockPagoData);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a pago', async () => {
      const updateData = { estado: 'pendiente' };
      const result = await controller.update('1', updateData);
      expect(result).toEqual({ affected: 1 });
      expect(service.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe('remove', () => {
    it('should remove a pago', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ affected: 1 });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
