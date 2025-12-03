import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Adopcion')
export class Adopcion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombreCliente: string;

  @Column()
  cedula: number;

  @Column()
  nombreMascota: string;

  @Column()
  raza: string;

  @Column()
  edad: number;

  @Column()
  fechaAdopcion: Date;
}
