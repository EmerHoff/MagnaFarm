import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('assinatura')
export class Assinatura {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Usuario)
    @JoinColumn()
    usuario: Usuario;

    @Column()
    quantidade_total: number;

    @Column()
    quantidade_contratada: number;

    @Column()
    dh_registro: Date;

    @Column()
    atual: boolean;

    @BeforeInsert()
    setDate() {
        this.dh_registro = new Date();
    }
}