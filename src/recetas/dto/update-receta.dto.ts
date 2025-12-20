import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRecetaDto {
  @IsString()
  @IsOptional()
   dosis: string;
 
   @IsString()
   @IsOptional()
   duracion: string; 
 
   @IsNumber()
   @IsOptional()
   id_consulta: number;
 
   @IsNumber()
   @IsOptional()
   id_medicamento: number;
}
