import { IsString, IsUUID, IsOptional, IsIn, MaxLength } from 'class-validator';

export class CreateConsultaDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  petId?: string;

  @IsOptional()
  @IsIn(['open', 'closed', 'cancelled'])
  status?: string;
}
