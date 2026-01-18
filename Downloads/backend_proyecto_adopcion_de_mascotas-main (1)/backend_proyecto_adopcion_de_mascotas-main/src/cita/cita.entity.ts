import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from '../mascota/mascota.entity';
import { Veterinario } from '../veterinario/veterinario.entity';

@Entity('cita')
export class Cita {
  @PrimaryGeneratedColumn('uuid')
  id_cita: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'time' })
  hora: string;

  @Column()
  motivo: string;

  @Column()
  id_mascota: string;

  @ManyToOne(() => Mascota, { nullable: false })
  @JoinColumn({ name: 'id_mascota' })
  mascota: Mascota;

  @Column()
  id_veterinario: string;

  @ManyToOne(() => Veterinario, { nullable: false })
  @JoinColumn({ name: 'id_veterinario' })
  veterinario: Veterinario;
}