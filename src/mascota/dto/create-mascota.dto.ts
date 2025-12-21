<<<<<<< HEAD
import { IsString, IsUUID, IsOptional, IsNumber } from 'class-validator';
=======
import { IsString, IsNotEmpty } from 'class-validator';
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee

export class CreateMascotaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  especie: string;

  @IsString()
  @IsNotEmpty()
  raza: string;

<<<<<<< HEAD
  @IsOptional()
  @IsNumber()
  edad?: number;

  @IsUUID()
  id_cliente: string;
}
=======
  @IsString()
  @IsNotEmpty()
  id_cliente: string; 
}
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee
