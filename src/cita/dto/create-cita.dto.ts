import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

export class CreateCitaDto {
  @IsOptional()
  @IsUUID()
  consultaId?: string;

  @IsOptional()
  @IsUUID()
  usuarioId?: string;

  @IsDateString()
  fechaHora: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}
