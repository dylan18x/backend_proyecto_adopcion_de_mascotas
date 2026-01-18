import { Test, TestingModule } from '@nestjs/testing';
import { CitaController } from './cita.controller';
import { CitaService } from './cita.service';

describe('CitaController', () => {
  let controller: CitaController;
  let service: CitaService;

  
  const mockCitaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitaController],
      providers: [
        {
          provide: CitaService,
          useValue: mockCitaService,
        },
      ],
    }).compile();

    controller = module.get<CitaController>(CitaController);
    service = module.get<CitaService>(CitaService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  
  it('create debe llamar al servicio con el DTO', async () => {
    const dto = { motivo: 'Prueba', fecha: new Date() };
    mockCitaService.create.mockResolvedValue({ id_cita: '1', ...dto });

    const result = await controller.create(dto as any);
    
    expect(mockCitaService.create).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('id_cita');
  });

  
  it('findAll debe llamar al servicio con paginación', async () => {
    const mockPagination = { items: [], meta: {} };
    mockCitaService.findAll.mockResolvedValue(mockPagination);

   
    const result = await controller.findAll();

    expect(mockCitaService.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    expect(result).toEqual(mockPagination);
  });

  
  it('findOne debe retornar una cita', async () => {
    const mockCita = { id_cita: '1', motivo: 'Test' };
    mockCitaService.findOne.mockResolvedValue(mockCita);

    const result = await controller.findOne('1');
    expect(result).toEqual(mockCita);
    expect(mockCitaService.findOne).toHaveBeenCalledWith('1');
  });

  
  it('update debe actualizar una cita', async () => {
    const dto = { motivo: 'Actualizado' };
    mockCitaService.update.mockResolvedValue({ id_cita: '1', ...dto });

    const result = await controller.update('1', dto as any);
    expect(mockCitaService.update).toHaveBeenCalledWith('1', dto);
    expect(result.motivo).toEqual('Actualizado');
  });

 
  it('remove debe eliminar una cita', async () => {
    mockCitaService.remove.mockResolvedValue({ deleted: true });

    await controller.remove('1');
    expect(mockCitaService.remove).toHaveBeenCalledWith('1');
  });
});