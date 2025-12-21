<<<<<<< HEAD
import { IsString, IsOptional } from 'class-validator';
=======
import { IsOptional, IsString } from 'class-validator';

>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee
export class UpdateVeterinarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}