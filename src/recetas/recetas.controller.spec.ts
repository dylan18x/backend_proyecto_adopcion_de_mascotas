import { Test, TestingModule } from '@nestjs/testing';
import { RecetasController } from './recetas.controller';
import { RecetasService } from './recetas.service';

describe('RecetasController', () => {
  let controlador: RecetasController;
  let servicio: RecetasService;

  const mockRecetasService = {
    findAll: jest.fn().mockResolvedValue({
      items: [{ id: 1, descripcion: 'Jarabe para la tos' }],
      meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 }
    }),
    findOne: jest.fn().mockResolvedValue({ id: 1, descripcion: 'Jarabe para la tos' }),
    create: jest.fn().mockImplementation(dto => ({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [RecetasController],
      providers: [
        {
          provide: RecetasService,
          useValue: mockRecetasService,
        },
      ],
    }).compile();

    controlador = modulo.get<RecetasController>(RecetasController);
    servicio = modulo.get<RecetasService>(RecetasService);
  });

  it('el controlador debe estar definido', () => {
    expect(controlador).toBeDefined();
  });

  it('debe llamar a findAll y recibir el objeto de paginación correcto', async () => {
    const numeroPagina = 1;

    const resultado = await controlador.findAll(numeroPagina);

    expect(resultado).toBeDefined();

    expect(mockRecetasService.findAll).toHaveBeenCalledWith({
      page: numeroPagina,
      limit: 10 
    });
  });
});