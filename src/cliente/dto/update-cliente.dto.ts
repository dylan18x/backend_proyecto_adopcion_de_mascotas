import { IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  nombre: string;

  @IsString()
  cedula: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;
}
