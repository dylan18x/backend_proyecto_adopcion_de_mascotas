import { Test, TestingModule } from '@nestjs/testing';
import { AdopcionesService } from './adopciones.service';

describe('AdopcionesService', () => {
  let service: AdopcionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdopcionesService],
    }).compile();

    service = module.get<AdopcionesService>(AdopcionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
