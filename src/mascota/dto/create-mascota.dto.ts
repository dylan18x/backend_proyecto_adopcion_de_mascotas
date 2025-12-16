import { IsString} from 'class-validator';
import { FindOperator } from 'typeorm';

export class CreateMascotaDto {
  @IsString()
  nombre: string;

  @IsString()
  especie: string;

  @IsString()
  raza: string;

  @IsString()
  id_cliente: string;
    cliente_id: string | FindOperator<string> | undefined;
}
