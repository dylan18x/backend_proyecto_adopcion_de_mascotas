import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @CreateDateColumn({ type: 'date' })
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  metodo_pago: string;
}
