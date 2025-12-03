import { IsOptional, IsString } from 'class-validator';

export class UpdateAdopcionDto {
  @IsString()
  @IsOptional()
    nombreCliente: string;
  
    @IsString()
    @IsOptional()
    cedula: number;
  
    @IsString()
    @IsOptional()
    nombreMascota: string;
  
    @IsString()
    @IsOptional()
    raza: string;
  
    @IsString()
    @IsOptional()
    edad: number;
  
    @IsString()
    @IsOptional()
    fechaAdopcion: Date;
}
