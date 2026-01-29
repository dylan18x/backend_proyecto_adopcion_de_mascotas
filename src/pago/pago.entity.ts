import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
@Entity('pago')
export class Pago {
  @PrimaryGeneratedColumn('uuid')
  id_pago: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ name: 'metodo_pago' })
  metodo_pago: string;

  @Column({ name: 'username_donante', nullable: true })
  username_donante: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'username_donante', referencedColumnName: 'username' })
  usuario: User;
}