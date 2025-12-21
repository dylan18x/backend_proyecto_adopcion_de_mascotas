<<<<<<< HEAD
import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';
=======
import { IsOptional, IsString } from 'class-validator';
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee

export class UpdateMascotaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  especie?: string;

  @IsOptional()
  @IsString()
  raza?: string;

  @IsOptional()
<<<<<<< HEAD
  @IsNumber()
  edad?: number;

  @IsOptional()
  @IsUUID()
  id_cliente?: string;
}
=======
  @IsString()
  id_cliente?: string;
}
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee
