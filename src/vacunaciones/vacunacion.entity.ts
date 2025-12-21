import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Mascota } from '../mascota/mascota.entity';
import { Vacuna } from '../vacunas/vacuna.entity';

@Entity('vacunacion')
export class Vacunacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  fecha: string;

  @Column()
  mascotaId: string;

  @Column()
  vacunaId: string;

  @ManyToOne(() => Mascota, { nullable: false })
  @JoinColumn({ name: 'mascotaId' })
  mascota: Mascota;

  @ManyToOne(() => Vacuna, { nullable: false })
  @JoinColumn({ name: 'vacunaId' })
  vacuna: Vacuna;
}
