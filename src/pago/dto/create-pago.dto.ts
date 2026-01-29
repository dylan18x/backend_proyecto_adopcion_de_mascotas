import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreatePagoDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsNumber()
  monto: number;

  @IsString()
  metodo_pago: string;

  // Cambiamos id_cliente por este campo
  @IsString()
  @IsOptional()
  username_donante?: string;
}