import { IsDateString, IsUUID } from 'class-validator';

export class CreateVacunacionDto {
  @IsDateString()
  fecha: string;

  @IsUUID()
  mascotaId: string;

  @IsUUID()
  vacunaId: string;
}
