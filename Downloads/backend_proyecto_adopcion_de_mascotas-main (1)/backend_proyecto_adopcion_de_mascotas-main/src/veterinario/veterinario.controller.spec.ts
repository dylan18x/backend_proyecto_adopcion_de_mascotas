import { Test, TestingModule } from '@nestjs/testing';
import { VeterinariosController } from './veterinario.controller';
import { VeterinariosService } from './veterinario.service';

describe('VeterinariosController', () => {
  let controlador: VeterinariosController;
  let servicio: VeterinariosService;

  const mockVeterinariosService = {
    findAll: jest.fn().mockResolvedValue({ items: [] }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [VeterinariosController],
      providers: [{ provide: VeterinariosService, useValue: mockVeterinariosService }],
    }).compile();

    controlador = modulo.get<VeterinariosController>(VeterinariosController);
    servicio = modulo.get<VeterinariosService>(VeterinariosService);
  });

  it('debe llamar a remove con el ID correcto', async () => {
    const id = '1';
    await controlador.remove(id);
    expect(mockVeterinariosService.remove).toHaveBeenCalledWith(id);
  });
});