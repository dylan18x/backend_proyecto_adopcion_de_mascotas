import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vacunas')
export class Vacuna {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  fabricante: string;


}
