import { IsOptional, IsString , IsNumber} from 'class-validator';

export class UpdateMascotaDto {
  @IsOptional()
  @IsString()
  nombre: string;

  @IsString()
  especie: string;

  @IsString()
  raza: string;

  @IsString()
  id_cliente: string;
}
