import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaController } from './consulta.controller';
import { ConsultaService } from './consulta.service';

describe('ConsultaController', () => {
  let controller: ConsultaController;
  let service: ConsultaService;

  const mockConsultaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultaController],
      providers: [
        {
          provide: ConsultaService,
          useValue: mockConsultaService,
        },
      ],
    }).compile();

    controller = module.get<ConsultaController>(ConsultaController);
    service = module.get<ConsultaService>(ConsultaService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  
  it('create debe llamar al servicio', async () => {
    const dto = { diagnostico: 'Test' };
    mockConsultaService.create.mockResolvedValue({ id: '1', ...dto });

    const result = await controller.create(dto as any);
    expect(mockConsultaService.create).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('id');
  });

  it('findAll debe llamar al servicio con paginación', async () => {
    mockConsultaService.findAll.mockResolvedValue({ items: [], meta: {} });
    
    await controller.findAll();
    expect(mockConsultaService.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
  });

  
  it('findOne debe retornar una consulta', async () => {
    const mockData = { id: '1' };
    mockConsultaService.findOne.mockResolvedValue(mockData);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockData);
  });

  it('update debe llamar al servicio', async () => {
    const dto = { diagnostico: 'Update' };
    mockConsultaService.update.mockResolvedValue({ id: '1', ...dto });

    await controller.update('1', dto as any);
    expect(mockConsultaService.update).toHaveBeenCalledWith('1', dto);
  });

  
  it('remove debe llamar al servicio', async () => {
    mockConsultaService.remove.mockResolvedValue({ deleted: true });

    await controller.remove('1');
    expect(mockConsultaService.remove).toHaveBeenCalledWith('1');
  });
});