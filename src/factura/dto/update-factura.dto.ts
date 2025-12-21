import { IsOptional, IsDateString, IsNumber, IsUUID } from 'class-validator';

export class UpdateFacturaDto {
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsUUID()
  id_pago?: string;
}