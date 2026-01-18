import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosController } from './medicamentos.controller';
import { MedicamentosService } from './medicamentos.service';

describe('MedicamentosController', () => {
  let controller: MedicamentosController;
  let service: MedicamentosService;

  const mockMedicamentosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicamentosController],
      providers: [
        {
          provide: MedicamentosService,
          useValue: mockMedicamentosService,
        },
      ],
    }).compile();

    controller = module.get<MedicamentosController>(MedicamentosController);
    service = module.get<MedicamentosService>(MedicamentosService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('create debe llamar al servicio', async () => {
    const dto = { nombre: 'Aspirina' };
    mockMedicamentosService.create.mockResolvedValue({ id: '1', ...dto });

    const result = await controller.create(dto as any);
    expect(mockMedicamentosService.create).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('id');
  });

  it('findAll debe llamar al servicio con paginación', async () => {
    mockMedicamentosService.findAll.mockResolvedValue({ items: [], meta: {} });
    
    await controller.findAll();
    expect(mockMedicamentosService.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });

  it('findOne debe retornar un medicamento', async () => {
    const mockData = { id: '1', nombre: 'Test' };
    mockMedicamentosService.findOne.mockResolvedValue(mockData);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockData);
  });

  it('update debe llamar al servicio', async () => {
    const dto = { nombre: 'Update' };
    mockMedicamentosService.update.mockResolvedValue({ id: '1', ...dto });

    await controller.update('1', dto as any);
    expect(mockMedicamentosService.update).toHaveBeenCalledWith('1', dto);
  });

  it('remove debe llamar al servicio', async () => {
    mockMedicamentosService.remove.mockResolvedValue({ deleted: true });

    await controller.remove('1');
    expect(mockMedicamentosService.remove).toHaveBeenCalledWith('1');
  });
});