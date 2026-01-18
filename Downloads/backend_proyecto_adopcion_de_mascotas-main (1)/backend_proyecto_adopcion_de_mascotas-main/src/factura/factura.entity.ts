import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pago } from '../pago/pago.entity';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn('uuid')
  id_factura: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ name: 'id_pago' })
  id_pago: string;

  @ManyToOne(() => Pago)
  @JoinColumn({ name: 'id_pago' })
  pago: Pago;
}