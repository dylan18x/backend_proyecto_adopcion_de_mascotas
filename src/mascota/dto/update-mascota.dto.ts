import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

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
  @IsNumber()
  edad?: number;

  @IsOptional()
  @IsUUID()
  id_cliente?: string;
}
