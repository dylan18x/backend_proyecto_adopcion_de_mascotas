import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from '../mascota/mascota.entity';

@Entity('historial_medico')
export class HistorialMedico {
  @PrimaryGeneratedColumn('uuid')
  id_historial: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  descripcion: string;

  @Column({ name: 'id_mascota' })
  id_mascota: string;

  @ManyToOne(() => Mascota)
  @JoinColumn({ name: 'id_mascota', referencedColumnName: 'id' })
  mascota: Mascota;
}