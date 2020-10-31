import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity('propriedade')
export class Propriedade {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => Usuario)
    @JoinColumn()
    usuario: Usuario

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    comarca: string;

    @Column()
    matricula: string;

    @Column()
    area: number;
}