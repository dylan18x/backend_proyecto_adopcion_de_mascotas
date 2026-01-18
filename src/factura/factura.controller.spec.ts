import { Test, TestingModule } from '@nestjs/testing';
import { FacturaController } from './factura.controller';
import { FacturaService } from './factura.service';
import { Factura } from './factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

describe('FacturaController', () => {
  let controller: FacturaController;
  let mockService: any;

  const mockFactura = {
    id_factura: 'uuid-factura-1',
    fecha: new Date('2024-01-18'),
    total: 500.75,
    pago: {
      id_pago: 'uuid-pago-1',
    },
  };

  beforeEach(async () => {
    mockService = {
      create: jest.fn().mockResolvedValue(mockFactura),
      findAll: jest.fn().mockResolvedValue({
        items: [mockFactura],
        meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 }
      }),
      findOne: jest.fn().mockResolvedValue(mockFactura),
      update: jest.fn().mockResolvedValue(mockFactura),
      remove: jest.fn().mockResolvedValue(mockFactura),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacturaController],
      providers: [
        {
          provide: FacturaService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FacturaController>(FacturaController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('crear factura', () => {
    it('debería crear una nueva factura', async () => {
      const data: CreateFacturaDto = {
        fecha: '2024-01-18',
        total: 500.75,
        id_pago: 'uuid-pago-1',
      };

      const result = await controller.create(data);

      expect(mockService.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(mockFactura);
    });
  });

  describe('listar facturas', () => {
    it('debería devolver un objeto de paginación', async () => {
      const result = await controller.findAll(1, 10);

      expect(mockService.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
      expect(result.items).toEqual([mockFactura]);
    });
  });

  describe('obtener una factura', () => {
    it('debería devolver una factura por su id', async () => {
      const result = await controller.findOne('uuid-factura-1');

      expect(mockService.findOne).toHaveBeenCalledWith('uuid-factura-1');
      expect(result).toEqual(mockFactura);
    });
  });

  describe('actualizar factura', () => {
    it('debería actualizar una factura', async () => {
      const data: UpdateFacturaDto = {
        total: 600,
      };

      const result = await controller.update('uuid-factura-1', data);

      expect(mockService.update).toHaveBeenCalledWith('uuid-factura-1', data);
      expect(result).toEqual(mockFactura);
    });
  });

  describe('eliminar factura', () => {
    it('debería eliminar una factura', async () => {
      const result = await controller.remove('uuid-factura-1');

      expect(mockService.remove).toHaveBeenCalledWith('uuid-factura-1');
      expect(result).toEqual(mockFactura);
    });
  });
});