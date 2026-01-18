import { Test, TestingModule } from '@nestjs/testing';
import { ConsultaService } from './consulta.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consulta } from './consulta.entity';
import { NotFoundException } from '@nestjs/common';


jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue({
    items: [],
    meta: { itemCount: 0, totalItems: 0, itemsPerPage: 10, totalPages: 0, currentPage: 1 },
  }),
}));

describe('ConsultaService', () => {
  let service: ConsultaService;
  let repositoryMock: any;

  const mockConsultaRepository = {
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
        ConsultaService,
        {
          provide: getRepositoryToken(Consulta),
          useValue: mockConsultaRepository,
        },
      ],
    }).compile();

    service = module.get<ConsultaService>(ConsultaService);
    repositoryMock = module.get(getRepositoryToken(Consulta));
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  
  it('create debe guardar una nueva consulta', async () => {
    const dto = { diagnostico: 'Gripe', tratamiento: 'Reposo' }; 
    const expected = { id: '1', ...dto };

    mockConsultaRepository.create.mockReturnValue(expected);
    mockConsultaRepository.save.mockResolvedValue(expected);

    const result = await service.create(dto as any);
    expect(result).toEqual(expected);
  });

  it('findAll debe llamar al queryBuilder y paginar', async () => {
    const result = await service.findAll({ page: 1, limit: 10 });
    
    expect(mockConsultaRepository.createQueryBuilder).toHaveBeenCalledWith('consulta');
    expect(result).toHaveProperty('items');
  });

  
  it('findOne debe retornar una consulta existente', async () => {
    const mockConsulta = { id: '1', diagnostico: 'Test' };
    mockConsultaRepository.findOne.mockResolvedValue(mockConsulta);

    const result = await service.findOne('1');
    expect(result).toEqual(mockConsulta);
  });

  it('findOne debe lanzar error si no existe', async () => {
    mockConsultaRepository.findOne.mockResolvedValue(null);
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  
  it('update debe actualizar una consulta', async () => {
    const mockConsulta = { id: '1', diagnostico: 'Viejo' };
    const dto = { diagnostico: 'Nuevo' };
    
  
    mockConsultaRepository.findOne.mockResolvedValue(mockConsulta);
   
    mockConsultaRepository.save.mockResolvedValue({ ...mockConsulta, ...dto });

    const result = await service.update('1', dto as any);
    expect(result.diagnostico).toBe('Nuevo');
  });

  
  it('remove debe eliminar una consulta', async () => {
    const mockConsulta = { id: '1' };
    mockConsultaRepository.findOne.mockResolvedValue(mockConsulta);
    mockConsultaRepository.remove.mockResolvedValue(mockConsulta);

    const result = await service.remove('1');
    expect(mockConsultaRepository.remove).toHaveBeenCalledWith(mockConsulta);
    expect(result).toEqual(mockConsulta);
  });
});