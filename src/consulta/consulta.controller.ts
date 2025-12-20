import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt-auth.guard';

interface AuthUser {
  userId?: string;
  role?: string;
}

@Controller('consultas')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @UseGuards(OptionalJwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Post()
  create(
    @Body() createDto: CreateConsultaDto,
    @Req() req: Request & { user?: AuthUser },
  ) {
    if (req.user) {
      createDto.userId = req.user.userId;
    }
    return this.consultaService.create(createDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.consultaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateConsultaDto) {
    return this.consultaService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultaService.remove(id);
  }
}
