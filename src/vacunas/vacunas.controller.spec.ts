import { Test, TestingModule } from '@nestjs/testing';
import { VacunasController } from './vacunas.controller';
import { VacunasService } from './vacunas.service';

describe('VacunasController', () => {
  let controlador: VacunasController;
  let servicio: VacunasService;

  const mockVacunasService = {
    findAll: jest.fn().mockResolvedValue({
      items: [{ id: 1, nombre: 'Parvovirus', descripcion: 'Dosis anual' }],
      meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
    }),
    findOne: jest.fn().mockResolvedValue({ id: 1, nombre: 'Parvovirus' }),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      controllers: [VacunasController],
      providers: [
        {
          provide: VacunasService,
          useValue: mockVacunasService,
        },
      ],
    }).compile();

    controlador = modulo.get<VacunasController>(VacunasController);
    servicio = modulo.get<VacunasService>(VacunasService);
  });

  it('debe llamar a findAll con objeto de paginación', async () => {
    const pagina = 1;
    await controlador.findAll(pagina);

    expect(mockVacunasService.findAll).toHaveBeenCalledWith({
      page: pagina,
      limit: 10,
    });
  });
});