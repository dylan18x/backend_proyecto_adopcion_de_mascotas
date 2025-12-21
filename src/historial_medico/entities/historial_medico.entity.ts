import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class HistorialMedico {
  @PrimaryGeneratedColumn()
  id_historial: number;

  @CreateDateColumn({ type: 'date' })
   fecha: Date;

  @Column()
  descripcion: string;

  @Column()
  id_mascota: number;
}
