import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateVacunacionDto {
  @IsDate()
    fecha: Date;
  
    @IsNumber()
    id_mascota: number; 
  
    @IsNumber()
    id_vacuna: number; 
}
