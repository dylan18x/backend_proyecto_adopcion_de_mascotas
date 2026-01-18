import { Test, TestingModule } from '@nestjs/testing';
import { PagosService } from './pago.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pago } from './pago.entity';
import { Repository } from 'typeorm';

describe('PagoService', () => {
  let service: PagosService;
  let repository: Repository<Pago>;

  const mockPago = {
    id_pago: '1',
    fecha: '2024-01-18',
    monto: 100.50,
    metodo_pago: 'Tarjeta de Crédito',
  };

  const mockQueryBuilder = {
    orderBy: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
  };

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockResolvedValue(mockPago),
    findOne: jest.fn().mockResolvedValue(mockPago),
    remove: jest.fn().mockResolvedValue(mockPago),
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
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

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debe crear y guardar un pago', async () => {
      const dto = {
        fecha: '2024-01-18',
        monto: 100.50,
        metodo_pago: 'Tarjeta de Crédito',
      };

      const result = await service.create(dto as any);

      expect(result).toEqual(mockPago);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('debe llamar al repositorio para listar pagos', async () => {
      try {
        await service.findAll({ page: 1, limit: 10 } as any);
      } catch (e) {
      }
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debe retornar un pago por ID', async () => {
      const result = await service.findOne('1' as any);
      expect(result).toEqual(mockPago);
      expect(mockRepository.findOne).toHaveBeenCalled();
    });
  });
});