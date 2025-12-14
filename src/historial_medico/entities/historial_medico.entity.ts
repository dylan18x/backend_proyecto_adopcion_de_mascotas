import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HistorialMedico {
  @PrimaryGeneratedColumn()
  id_historial: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column()
  descripcion: string;

  @Column()
  id_mascota: number;
}
    