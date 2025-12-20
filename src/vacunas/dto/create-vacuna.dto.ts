import { IsString } from 'class-validator';

export class CreateVacunaDto {
  @IsString()
  nombre: string;

  @IsString()
  fabricante: string;
  
}
