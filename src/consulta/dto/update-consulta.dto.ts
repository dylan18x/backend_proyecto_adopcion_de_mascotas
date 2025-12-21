import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateConsultaDto {
  @IsOptional()
  @IsString()
  diagnostico?: string;

  @IsOptional()
  @IsString()
  tratamiento?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsUUID()
  id_cita?: string;
}