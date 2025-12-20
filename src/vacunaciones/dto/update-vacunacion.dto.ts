import { IsDataURI, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVacunacionDto {
  @IsDate()
  @IsOptional()
  fecha: Date;
  
  @IsNumber()
  @IsOptional()
  id_mascota: number; 
  
  @IsNumber()
  @IsOptional()
  id_vacuna: number; 
}
