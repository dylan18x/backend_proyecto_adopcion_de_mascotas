import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HistorialMedico {
  @PrimaryGeneratedColumn()
  id_historial: number;

  @Column()
  descripcion: string;

  @Column({ type: 'date' })
  fecha: string;
}
