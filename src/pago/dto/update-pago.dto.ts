import { IsOptional, IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdatePagoDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsNumber()
  monto?: number;

  @IsOptional()
  @IsString()
  metodo_pago?: string;

  @IsOptional()
  @IsUUID()
  id_cliente?: string;
}