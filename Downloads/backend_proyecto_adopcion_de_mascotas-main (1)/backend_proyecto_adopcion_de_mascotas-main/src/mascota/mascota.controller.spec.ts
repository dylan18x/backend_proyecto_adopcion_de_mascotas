import { Test, TestingModule } from '@nestjs/testing';
import { MascotasController } from './mascota.controller';
import { MascotasService } from './mascota.service';

describe('MascotasController', () => {
  let controlador: MascotasController;

  const mockMascotasService = {
    findAll: jest.fn().mockResolvedValue({ items: [] }),
    create: jest.fn().mockImplementation(dto => ({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [MascotasController],
      providers: [{ provide: MascotasService, useValue: mockMascotasService }],
    }).compile();

    controlador = modulo.get<MascotasController>(MascotasController);
  });

  it('debe llamar a findAll con los parámetros correctos', async () => {
    await controlador.findAll(1, 10);
    expect(mockMascotasService.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });
});