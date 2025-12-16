import { Test, TestingModule } from '@nestjs/testing';
import { MascotasService } from './mascota.service';

describe('MascotaService', () => {
  let service: MascotasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MascotasService],
    }).compile();

    service = module.get<MascotasService>(MascotasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
