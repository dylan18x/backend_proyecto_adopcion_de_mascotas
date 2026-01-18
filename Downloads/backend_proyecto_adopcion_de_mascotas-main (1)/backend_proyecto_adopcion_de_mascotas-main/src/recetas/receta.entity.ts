import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Consulta } from '../consulta/consulta.entity';
import { Medicamento } from '../medicamentos/medicamento.entity';

@Entity('receta')
export class Receta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dosis: string;

  @Column()
  duracion: string;

  @Column()
  consultaId: string;

  @Column()
  medicamentoId: string;

  @ManyToOne(() => Consulta, { nullable: false })
  @JoinColumn({ name: 'consultaId' })
  consulta: Consulta;

  @ManyToOne(() => Medicamento, { nullable: false })
  @JoinColumn({ name: 'medicamentoId' })
  medicamento: Medicamento;
}
