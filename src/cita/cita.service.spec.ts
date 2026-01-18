import { Test, TestingModule } from '@nestjs/testing';
import { CitaService } from './cita.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cita } from './cita.entity';
import { NotFoundException } from '@nestjs/common';


jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue({
    items: [],
    meta: { itemCount: 0, totalItems: 0, itemsPerPage: 10, totalPages: 0, currentPage: 1 },
  }),
}));

describe('CitaService', () => {
  let service: CitaService;
  let repositoryMock: any;

  const mockCitaRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      orderBy: jest.fn().mockReturnThis(), 
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitaService,
        {
          provide: getRepositoryToken(Cita),
          useValue: mockCitaRepository,
        },
      ],
    }).compile();

    service = module.get<CitaService>(CitaService);
    repositoryMock = module.get(getRepositoryToken(Cita));
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  
  it('create debe guardar una nueva cita', async () => {
    const dto = { fecha: new Date(), motivo: 'Vacuna' }; // Datos de prueba
    const expectedCita = { id_cita: '1', ...dto };

    mockCitaRepository.create.mockReturnValue(expectedCita);
    mockCitaRepository.save.mockResolvedValue(expectedCita);

    const result = await service.create(dto as any);
    expect(result).toEqual(expectedCita);
    expect(mockCitaRepository.create).toHaveBeenCalledWith(dto);
  });

  
  it('findAll debe retornar datos paginados', async () => {
    const options = { page: 1, limit: 10 };
    
    
    const result = await service.findAll(options);
    
    
    expect(mockCitaRepository.createQueryBuilder).toHaveBeenCalledWith('cita');
   
    expect(result).toHaveProperty('items');
    expect(result).toHaveProperty('meta');
  });

  
  it('findOne debe retornar una cita si existe', async () => {
    const mockCita = { id_cita: '1', motivo: 'Consulta' };
    mockCitaRepository.findOne.mockResolvedValue(mockCita);

    const result = await service.findOne('1');
    expect(result).toEqual(mockCita);
  });

  it('findOne debe lanzar error si no existe', async () => {
    mockCitaRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  
  it('update debe modificar y guardar la cita', async () => {
    const mockCita = { id_cita: '1', motivo: 'Viejo' };
    const updateDto = { motivo: 'Nuevo' };
    const expectedCita = { ...mockCita, ...updateDto };

   
    mockCitaRepository.findOne.mockResolvedValue(mockCita);
    
    mockCitaRepository.save.mockResolvedValue(expectedCita);

    const result = await service.update('1', updateDto as any);
    
    expect(result.motivo).toEqual('Nuevo');
    expect(mockCitaRepository.save).toHaveBeenCalled();
  });

  it('update debe lanzar error si la cita no existe', async () => {
    mockCitaRepository.findOne.mockResolvedValue(null);
    await expect(service.update('999', {})).rejects.toThrow(NotFoundException);
  });

 
  it('remove debe eliminar una cita', async () => {
    const mockCita = { id_cita: '1' };
    mockCitaRepository.findOne.mockResolvedValue(mockCita);
    mockCitaRepository.remove.mockResolvedValue(mockCita);

    const result = await service.remove('1');
    expect(result).toEqual(mockCita);
    expect(mockCitaRepository.remove).toHaveBeenCalledWith(mockCita);
  });
}); 