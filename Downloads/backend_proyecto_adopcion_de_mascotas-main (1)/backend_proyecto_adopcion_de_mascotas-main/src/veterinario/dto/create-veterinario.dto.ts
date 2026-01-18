import { IsString} from 'class-validator';

export class CreateVeterinarioDto {
    @IsString()
    nombre: string;
    
    @IsString()
    especialidad: string;

    @IsString()
    telefono: string;
}
