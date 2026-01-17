import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './cliente.controller';
import { ClientesService } from './cliente.service';

describe('ClientesController', () => {
  let controlador: ClientesController;

  const mockClientesService = {
    findAll: jest.fn().mockResolvedValue({ items: [] }),
    create: jest.fn().mockImplementation(dto => ({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [{ provide: ClientesService, useValue: mockClientesService }],
    }).compile();
    controlador = modulo.get<ClientesController>(ClientesController);
  });

  it('debe llamar a findAll', async () => {
    await controlador.findAll(1);
    expect(mockClientesService.findAll).toHaveBeenCalled();
  });
});