import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';

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

  @Column({ name: 'id_cliente' })
  id_cliente: string;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;
}