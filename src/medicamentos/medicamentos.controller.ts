import {Controller,Get,Post,Put,Delete,Body,Param,Query,} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { Medicamento } from './medicamento.entity';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(
    private readonly medicamentosService: MedicamentosService,
  ) {}

  @Post()
  create(@Body() createDto: CreateMedicamentoDto) {
    return this.medicamentosService.create(createDto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Medicamento>> {
    limit = limit > 100 ? 100 : limit;
    return this.medicamentosService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicamentosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateMedicamentoDto,
  ) {
    return this.medicamentosService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicamentosService.remove(id);
  }
}
