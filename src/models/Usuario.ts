import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}