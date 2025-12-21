import { IsString, IsUUID } from 'class-validator';

export class CreateConsultaDto {
  @IsString()
  diagnostico: string;

  @IsString()
  tratamiento: string;

  @IsString()
  observaciones: string;

  @IsUUID()
  id_cita: string;
}