import { IsString } from 'class-validator';

export class CreateAdopcionDto {
    @IsString()
    nombreCliente: string;
  
    @IsString()
    cedula: number;
  
    @IsString()
    nombreMascota: string;
  
    @IsString()
    raza: string;
  
    @IsString()
    edad: number;
  
    @IsString()
    fechaAdopcion: Date;
}
