import { IsOptional, IsDateString, IsUUID } from 'class-validator';

export class UpdateVacunacionDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsUUID()
  mascotaId?: string;

  @IsOptional()
  @IsUUID()
  vacunaId?: string;
}
