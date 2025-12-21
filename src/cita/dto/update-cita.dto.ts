import { IsOptional, IsString, IsUUID } from 'class-validator';
export class UpdateCitaDto {
  @IsOptional() 
  @IsString() 
  fecha?: string;

  @IsOptional() 
  @IsString() 
  hora?: string;

  @IsOptional() 
  @IsString() 
  motivo?: string;

  @IsOptional() 
  @IsUUID() 
  id_mascota?: string;

  @IsOptional() 
  @IsUUID() 
  id_veterinario?: string;
}