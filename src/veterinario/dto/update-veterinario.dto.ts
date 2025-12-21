import { IsString, IsOptional } from 'class-validator';
export class UpdateVeterinarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}