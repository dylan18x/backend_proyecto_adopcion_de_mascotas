import {Controller,Get,Post,Put,Delete,Body,Param,Query,} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { Medicamento } from './medicamento.entity';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/user.entity';
import { Public } from 'src/auth/public.decorator';

@Controller('medicamentos')
export class MedicamentosController {
  constructor(
    private readonly medicamentosService: MedicamentosService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createDto: CreateMedicamentoDto) {
    return this.medicamentosService.create(createDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Medicamento>> {
    limit = limit > 100 ? 100 : limit;
    return this.medicamentosService.findAll({ page, limit });
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicamentosService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateMedicamentoDto,
  ) {
    return this.medicamentosService.update(id, updateDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicamentosService.remove(id);
  }
}
