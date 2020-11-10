import { format } from 'path';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    login: string;

    @Column()
    senha: string;

    @Column()
    identificador: string;

    @Column()
    telefone: string;

    @Column()
    nome: string;

    @Column()
    dh_registro: Date;

    @Column()
    admin: boolean;

    @BeforeInsert()
    setDate() {
        this.dh_registro = new Date();
    }
}