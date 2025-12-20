import { IsNumber, IsString } from 'class-validator';

export class CreateRecetaDto {
  @IsString()
   dosis: string;
 
   @IsString()
   duracion: string; 
 
   @IsNumber()
   id_consulta: number;
 
   @IsNumber()
   id_medicamento: number;
}
