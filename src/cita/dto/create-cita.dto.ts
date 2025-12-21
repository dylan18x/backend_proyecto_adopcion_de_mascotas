import { IsString, IsUUID } from 'class-validator';
export class CreateCitaDto {
  @IsString() 
  fecha: string;

  @IsString() 
  hora: string;

  @IsString() 
  motivo: string;

  @IsUUID() 
  id_mascota: string;
  
  @IsUUID() 
  id_veterinario: string;
}
