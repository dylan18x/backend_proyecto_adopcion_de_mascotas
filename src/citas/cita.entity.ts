import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('citas')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fecha: Date;

  @Column({ type: 'time' })
  hora: string;

  @Column()
  motivo: string;


}
