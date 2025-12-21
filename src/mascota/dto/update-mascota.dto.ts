import { IsOptional, IsString } from 'class-validator';

export class UpdateMascotaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  especie?: string;

  @IsOptional()
  @IsString()
  raza?: string;

  @IsOptional()
  @IsString()
  id_cliente?: string;
}