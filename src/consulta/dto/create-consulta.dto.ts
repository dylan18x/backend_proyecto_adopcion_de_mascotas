import { IsString, IsUUID, IsOptional, IsIn, MaxLength } from 'class-validator';

export class CreateConsultaDto {
  @IsString()
  @MaxLength(255)
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  mascotaId?: string;

  @IsOptional()
  @IsIn(['open', 'closed', 'cancelled'])
  status?: string;
}
