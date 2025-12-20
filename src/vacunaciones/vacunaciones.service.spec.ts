import { Test, TestingModule } from '@nestjs/testing';
import { VacunacionesService } from './vacunaciones.service';

describe('VacunacionesService', () => {
  let service: VacunacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacunacionesService],
    }).compile();

    service = module.get<VacunacionesService>(VacunacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
