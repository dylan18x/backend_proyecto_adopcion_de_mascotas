import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateConsultaDto {
  @IsString()
  diagnostico: string;

  @IsString()
  tratamiento: string;

  @IsOptional() 
  @IsString()
  observaciones: string;

  @IsUUID() 
  id_cita: string;
}