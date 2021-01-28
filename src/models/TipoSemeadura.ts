import { format } from 'path';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_semeadura')
export class TipoSemeadura {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    cultivo: string;

    @Column()
    ciclo: number;

}