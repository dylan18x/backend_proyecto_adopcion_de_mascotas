import { IsOptional, IsString , IsNumber} from 'class-validator';

export class UpdateVeterinarioDto {
  @IsOptional()
  @IsString()
  nombre: string;
  
  @IsString()
  especialidad: string;

  @IsString()
  telefono: string;
}
