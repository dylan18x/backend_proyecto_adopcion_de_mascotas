import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateMedicamentoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;
}