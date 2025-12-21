import { IsOptional, IsString } from 'class-validator';

export class UpdateVacunaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  fabricante?: string;
}
