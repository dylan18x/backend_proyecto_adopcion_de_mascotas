import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreatePagoDto {
  @IsDateString()
  fecha: string;

  @IsNumber()
  monto: number;

  @IsString()
  metodo_pago: string;

  @IsUUID()
  id_cliente: string; 
}