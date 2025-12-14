import { IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nombre: string;

  @IsString()
  cedula: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;
}
