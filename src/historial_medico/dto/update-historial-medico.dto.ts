import { IsOptional, IsDateString, IsString, IsUUID } from 'class-validator';

export class UpdateHistorialMedicoDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsUUID()
  id_mascota?: string;
}