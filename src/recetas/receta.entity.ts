import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recetas')
export class Receta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dosis: string;

  @Column()
  duracion: string; 

  @Column()
  id_consulta: number;

  @Column()
  id_medicamento: number;

}
