import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'consultas' })
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'titulo', length: 255 })
  titulo: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId: string;


  @Column({ name: 'mascota_id', type: 'uuid', nullable: true })
  mascotaId?: string;

  @Column({ name: 'estado', length: 32, default: 'open' })
  estado: string; 

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
