import { IsOptional, IsString } from 'class-validator';

export class UpdateVacunacionDto {
  @IsString()
  @IsOptional()
    fecha: Date;
  
    @IsString()
    @IsOptional()
    id_mascota: number; 
  
    @IsString()
    @IsOptional()
    id_vacuna: number; 
}
