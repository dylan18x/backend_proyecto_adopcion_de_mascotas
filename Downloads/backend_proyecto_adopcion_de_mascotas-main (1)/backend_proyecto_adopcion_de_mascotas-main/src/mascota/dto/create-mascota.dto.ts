import { IsString, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  id_cliente: string; 
}
