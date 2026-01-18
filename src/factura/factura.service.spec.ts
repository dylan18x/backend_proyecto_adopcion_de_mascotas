import { Test, TestingModule } from '@nestjs/testing';
import { FacturaService } from './factura.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Factura } from './factura.entity';
import { Repository } from 'typeorm';

describe('FacturaService', () => {
  let service: FacturaService;
  let repository: Repository<Factura>;

  const facturaMock = {
    id_factura: 'uuid-factura-1',
    fecha: new Date('2024-01-18'),
    total: 500.75,
    pago: {
      id_pago: 'uuid-pago-1',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FacturaService,
        {
          provide: getRepositoryToken(Factura),
          useValue: {
            create: jest.fn().mockReturnValue(facturaMock),
            save: jest.fn().mockResolvedValue(facturaMock),
          },
        },
      ],
    }).compile();

    service = module.get<FacturaService>(FacturaService);
    repository = module.get(getRepositoryToken(Factura));
  });

  it('el servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe crear una factura correctamente', async () => {
    const dto = {
      fecha: '2024-01-18',
      total: 500.75,
      id_pago: 'uuid-pago-1',
    };

    const result = await service.create(dto);

    expect(result).toEqual(facturaMock);
  });
});
