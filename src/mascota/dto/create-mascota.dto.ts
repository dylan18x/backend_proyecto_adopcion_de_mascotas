import { IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';

export class CreateMascotaDto {
  @IsString()
  nombre: string;

  @IsString()
  especie: string;

  @IsString()
  raza: string;

  @IsOptional()
  @IsNumber()
  edad?: number;

  @IsUUID()
  id_cliente: string;
}
