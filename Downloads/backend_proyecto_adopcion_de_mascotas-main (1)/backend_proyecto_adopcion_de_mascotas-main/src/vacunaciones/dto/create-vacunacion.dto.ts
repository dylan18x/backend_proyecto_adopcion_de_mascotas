import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVacunacionDto {
  @IsDateString()
  fecha: string;

  @IsString()
 @IsNotEmpty()
  mascotaId: string;

  
  @IsString()
  @IsNotEmpty()
  vacunaId: string;
}
