import { IsString, IsNumber } from 'class-validator';

export class CreateMedicamentoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  precio: number;
}