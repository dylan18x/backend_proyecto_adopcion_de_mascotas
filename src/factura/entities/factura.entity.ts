import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;
}
