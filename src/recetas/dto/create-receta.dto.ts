import { IsString } from 'class-validator';

export class CreateRecetaDto {
  @IsString()
   dosis: string;
 
   @IsString()
   duracion: string; 
 
   @IsString()
   id_consulta: number;
 
   @IsString()
   id_medicamento: number;
}
