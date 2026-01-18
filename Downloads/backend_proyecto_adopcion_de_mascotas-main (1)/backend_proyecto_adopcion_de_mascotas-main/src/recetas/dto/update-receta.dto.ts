import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateRecetaDto {
  @IsOptional()
  @IsString()
  dosis?: string;

  @IsOptional()
  @IsString()
  duracion?: string;

  @IsOptional()
  @IsUUID()
  consultaId?: string;

  @IsOptional()
  @IsUUID()
  medicamentoId?: string;
}
