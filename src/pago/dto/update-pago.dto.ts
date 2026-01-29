import { IsNumber, IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdatePagoDto {
  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsNumber()
  monto: number;

  @IsString()
  metodo_pago: string;

  @IsString()
  @IsOptional()
  username_donante?: string;
}