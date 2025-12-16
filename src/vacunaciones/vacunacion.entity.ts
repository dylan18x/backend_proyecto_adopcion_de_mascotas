import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Vacunacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fecha: Date;

  @Column()
  id_mascota: number; 

  @Column()
  id_vacuna: number; 


}
