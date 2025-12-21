import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';

@Entity('mascota')
export class Mascota {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  especie: string;

  @Column()
  raza: string;

  @Column()
  edad: number;

  @Column()
  id_cliente: string;

  @ManyToOne(() => Cliente, { nullable: false })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;
}