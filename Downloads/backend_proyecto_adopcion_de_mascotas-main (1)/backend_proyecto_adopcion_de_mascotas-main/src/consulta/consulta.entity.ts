import { Cita } from '../cita/cita.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity('consulta')
export class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  diagnostico: string;

  @Column()
  tratamiento: string;

  @Column()
  observaciones: string;

  @Column()
  id_cita: string;

  @OneToOne(() => Cita, { nullable: false })
  @JoinColumn({ name: 'id_cita' })
  cita: Cita;
}