import { IsOptional, IsString } from 'class-validator';

export class UpdateRecetaDto {
  @IsString()
  @IsOptional()
   dosis: string;
 
   @IsString()
   @IsOptional()
   duracion: string; 
 
   @IsString()
   @IsOptional()
   id_consulta: number;
 
   @IsString()
   @IsOptional()
   id_medicamento: number;
}
