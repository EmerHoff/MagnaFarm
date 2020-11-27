import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Talhao } from './Talhao';

@Entity('semeadura')
export class Semeadura {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Talhao)
    @JoinColumn()
    talhao: Talhao;

    @Column()
    plantio: string;

    @Column()
    dias: number;

    @Column()
    data_plantio: Date;

    @Column()
    atual: boolean;

    @BeforeInsert()
    setDate() {
        this.data_plantio = new Date();
    }
}