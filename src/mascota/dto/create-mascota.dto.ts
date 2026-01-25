import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMascotaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  especie: string;

  @IsString()
  @IsNotEmpty()
  raza: string;

  @IsString()
  @IsOptional() 
  id_cliente?: string; 
}