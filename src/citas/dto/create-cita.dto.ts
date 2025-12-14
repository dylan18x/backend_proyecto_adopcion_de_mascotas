import { IsString } from 'class-validator';

export class CreateCitaDto {
  @IsString()
  fecha: Date;
  
  @IsString()
  hora: string;
  
  @IsString()
  motivo: string;
}
