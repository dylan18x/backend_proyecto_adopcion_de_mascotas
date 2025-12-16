import { IsString } from 'class-validator';

export class CreateVacunacionDto {
  @IsString()
    fecha: Date;
  
    @IsString()
    id_mascota: number; 
  
    @IsString()
    id_vacuna: number; 
}
