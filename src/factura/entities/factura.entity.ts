import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'decimal' })
  total: number;

  @Column()
  id_pago: number;
}
