import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'medicamentos' })
export class Medicamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre', length: 255 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string;

  @Column({ name: 'precio', type: 'numeric', nullable: true })
  precio?: number;

  @Column({ name: 'stock', type: 'int', nullable: true })
  stock?: number;

  @Column({ name: 'fecha_caducidad', type: 'timestamp', nullable: true })
  fechaCaducidad?: Date;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn: Date;

  @UpdateDateColumn({ name: 'actualizado_en' })
  actualizadoEn: Date;
}
