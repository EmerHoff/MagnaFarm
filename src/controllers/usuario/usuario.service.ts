import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/models/Usuario';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly __usuario: Repository<Usuario>
    ) {}

    async listar() {
        const users = await this.__usuario.find();
        return { 
            message: 'Encontrado!',
            usuarios: users
        }
    }

    async buscar(id: string) {
        const usuario: Usuario = await this.__usuario.findOne(id);

        return { 
            message: 'Encontrado!',
            usuario: usuario,
        }
    }

    async salvar(body: any) {
        const { login, senha } = body;

        const user = await this.__usuario.findOne({ where: { login }}); 
        
        if (user) {
            return { 
                message: 'Já cadastrado!',
                usuario: user
            }
        }

        const usuario: Usuario = new Usuario;
        usuario.login = login;
        usuario.senha = senha;

        const response = await this.__usuario.save(usuario);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Cadastrado com sucesso!',
                usuario: usuario,
            }
        } else {
            throw new HttpException('Erro ao cadastrar usuario', 400);
        } 
    }
}
