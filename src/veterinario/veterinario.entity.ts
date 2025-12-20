
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('veterinario')
export class Veterinario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
    
    @Column()
    especialidad: string;

    @Column()
    telefono: string;

}
