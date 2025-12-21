import { IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  direccion?: string;
<<<<<<< HEAD
}
=======
}
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee
