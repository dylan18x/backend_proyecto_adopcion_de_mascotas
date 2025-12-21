import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateHistorialMedicoDto {
  @IsDateString()
  fecha: string;

  @IsString()
  descripcion: string;

  @IsUUID()
  id_mascota: string;
}