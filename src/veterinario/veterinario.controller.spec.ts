import { Test, TestingModule } from '@nestjs/testing';
import { VeterinariosController } from './veterinario.controller';

describe('VeterinarioController', () => {
  let controller: VeterinariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeterinariosController],
    }).compile();

    controller = module.get<VeterinariosController>(VeterinariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
