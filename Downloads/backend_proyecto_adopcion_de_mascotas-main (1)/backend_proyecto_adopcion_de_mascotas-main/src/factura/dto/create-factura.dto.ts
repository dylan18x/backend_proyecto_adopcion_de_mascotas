import { IsDateString, IsNumber, IsUUID } from 'class-validator';

export class CreateFacturaDto {
  @IsDateString()
  fecha: string;

  @IsNumber()
  total: number;

  @IsUUID()
  id_pago: string; 
}