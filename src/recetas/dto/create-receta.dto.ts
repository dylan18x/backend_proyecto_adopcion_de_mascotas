import { IsString, IsUUID } from 'class-validator';

export class CreateRecetaDto {
  @IsString()
  dosis: string;

  @IsString()
  duracion: string;

  @IsUUID()
  consultaId: string;

  @IsUUID()
  medicamentoId: string;
}
