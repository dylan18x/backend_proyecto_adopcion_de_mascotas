import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @CreateDateColumn({ type: 'date' })
   fecha: Date;
  

  @Column({ type: 'decimal' })
  total: number;

  @Column()
  id_pago: number;
}
