import { IsOptional, IsString } from 'class-validator';

export class UpdateVacunaDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  fabricante: string;
}
