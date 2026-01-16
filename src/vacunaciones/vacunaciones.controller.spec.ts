import { Test, TestingModule } from '@nestjs/testing';
import { VacunacionesController } from './vacunaciones.controller';
import { VacunacionesService } from './vacunaciones.service';

describe('VacunacionController', () => {
  let controlador: VacunacionesController;
  let servicio: VacunacionesService;

  const mockVacunacionService = {
    findAll: jest.fn().mockResolvedValue({
      items: [
        { 
          id: 1, 
          fecha: new Date(), 
          mascota: { id: 1, nombre: 'Firulais' }, 
          vacuna: { id: 2, nombre: 'Antirrábica' } 
        }
      ],
      meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
    }),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [VacunacionesController],
      providers: [
        {
          provide: VacunacionesService,
          useValue: mockVacunacionService,
        },
      ],
    }).compile();

    controlador = modulo.get<VacunacionesController>(VacunacionesController);
    servicio = modulo.get<VacunacionesService>(VacunacionesService);
  });

  it('debe llamar a findAll con objeto de paginación', async () => {
    const pagina = 1;
    await controlador.findAll(pagina);

    expect(mockVacunacionService.findAll).toHaveBeenCalledWith({
      page: pagina,
      limit: 10,
    });
  });
});