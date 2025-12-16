import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'citas' })
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'consulta_id', type: 'uuid', nullable: true })
  consultaId?: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId: string;

  @Column({ name: 'fecha_hora', type: 'timestamp' })
  fechaHora: Date;

  @Column({ name: 'notas', type: 'text', nullable: true })
  notas?: string;

  @Column({ name: 'estado', length: 32, default: 'pendiente' })
  estado: string;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
