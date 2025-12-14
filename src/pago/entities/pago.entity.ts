import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  metodo_pago: string;
}
