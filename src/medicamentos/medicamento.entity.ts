import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('medicamento')
export class Medicamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({type: 'decimal', precision: 10, scale: 2,default: 0})
  precio: number;
}

