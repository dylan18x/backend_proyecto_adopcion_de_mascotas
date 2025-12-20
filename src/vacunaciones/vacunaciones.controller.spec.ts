import { Test, TestingModule } from '@nestjs/testing';
import { VacunacionesController } from './vacunaciones.controller';

describe('VacunacionesController', () => {
  let controller: VacunacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacunacionesController],
    }).compile();

    controller = module.get<VacunacionesController>(VacunacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
