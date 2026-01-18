import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentosService } from './medicamentos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicamento } from './medicamento.entity';
import { NotFoundException } from '@nestjs/common';


jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn().mockResolvedValue({
    items: [],
    meta: { itemCount: 0, totalItems: 0, itemsPerPage: 10, totalPages: 0, currentPage: 1 },
  }),
}));

describe('MedicamentosService', () => {
  let service: MedicamentosService;
  let repositoryMock: any;

  
  const mockMedicamentoRepository = {
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
        MedicamentosService,
        {
          provide: getRepositoryToken(Medicamento),
          useValue: mockMedicamentoRepository,
        },
      ],
    }).compile();

    service = module.get<MedicamentosService>(MedicamentosService);
    repositoryMock = module.get(getRepositoryToken(Medicamento));
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('create debe guardar un medicamento', async () => {
    const dto = { nombre: 'Paracetamol', descripcion: 'Para el dolor' };
    const expected = { id: '1', ...dto };

    mockMedicamentoRepository.create.mockReturnValue(expected);
    mockMedicamentoRepository.save.mockResolvedValue(expected);

    const result = await service.create(dto as any);
    expect(result).toEqual(expected);
  });

  it('findAll debe paginar los resultados', async () => {
    const result = await service.findAll({ page: 1, limit: 10 });
    
    expect(mockMedicamentoRepository.createQueryBuilder).toHaveBeenCalledWith('medicamento');
    expect(result).toHaveProperty('items');
  });

  it('findOne debe retornar un medicamento si existe', async () => {
    const mockMed = { id: '1', nombre: 'Ibuprofeno' };
    mockMedicamentoRepository.findOne.mockResolvedValue(mockMed);

    const result = await service.findOne('1');
    expect(result).toEqual(mockMed);
  });

  it('findOne debe lanzar error si no existe', async () => {
    mockMedicamentoRepository.findOne.mockResolvedValue(null);
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  
  it('update debe modificar un medicamento', async () => {
    const mockMed = { id: '1', nombre: 'Viejo' };
    const dto = { nombre: 'Nuevo' };
    
    mockMedicamentoRepository.findOne.mockResolvedValue(mockMed); // Lo encuentra
    mockMedicamentoRepository.save.mockResolvedValue({ ...mockMed, ...dto }); // Lo guarda

    const result = await service.update('1', dto as any);
    expect(result.nombre).toBe('Nuevo');
  });

  
  it('remove debe eliminar un medicamento', async () => {
    const mockMed = { id: '1' };
    mockMedicamentoRepository.findOne.mockResolvedValue(mockMed);
    mockMedicamentoRepository.remove.mockResolvedValue(mockMed);

    const result = await service.remove('1');
    expect(mockMedicamentoRepository.remove).toHaveBeenCalledWith(mockMed);
    expect(result).toEqual(mockMed);
  });
});