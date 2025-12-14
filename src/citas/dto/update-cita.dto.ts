import { IsOptional, IsString } from 'class-validator';

export class UpdateCitaDto {
  @IsString()
  @IsOptional()
  fecha: Date;
  
  @IsString()
  @IsOptional()
  hora: string;
  
  @IsString()
  @IsOptional()
  motivo: string;
}
