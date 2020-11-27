import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Propriedade } from './Propriedade';

@Entity('talhao')
export class Talhao {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Propriedade)
    @JoinColumn()
    propriedade: Propriedade;

    @Column()
    nome: string;

    @Column()
    area: number;

    @Column()
    kml: string;
}