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

        if (usuario) {
            return { 
                statusCode: 200,
                message: 'Usuário encontrado!',
                usuario
            }
        } else {
            return {
                statusCode: 404,
                message: 'Usuário não encontrado!'
            }
        }
    }

    async salvar(body: any) {
        const { login, senha, confirma_senha, identificador, telefone, nome, admin } = body;

        const user = await this.__usuario.findOne({ where: { login }}); 
        
        if (user) {
            return { 
                statusCode: 403,
                message: 'Você já possui um cadastro com esse email!',
                usuario: user
            }
        }

        if (senha !== confirma_senha) {
            return { 
                statusCode: 400,
                message: 'As senhas não coincidem!',
            }
        }

        const usuario: Usuario = new Usuario;
        usuario.login = login;
        usuario.senha = senha;
        usuario.identificador = identificador;
        usuario.telefone = telefone;
        usuario.nome = nome;

        if (admin) {
            usuario.admin = admin;
        } else {
            usuario.admin = false;
        }

        const response = await this.__usuario.save(usuario);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Cadastrado com sucesso!',
                usuario,
            }
        } else {
            throw new HttpException('Erro ao cadastrar usuario', 400);
        } 
    }

    async login(body: any) {
        const { login, senha } = body;

        const user = await this.__usuario.findOne({ where: { login }}); 
        
        if (!user) {
            return { 
                statusCode: 404,
                message: 'Não foi encontrado um usuário com esse login!',
            }
        }

        if (user.senha === senha) {
            return { 
                statusCode: 200,
                message: 'Login realizado com sucesso!',
                usuario: user
            }
        } else {
            return { 
                statusCode: 400,
                message: 'A senha está incorreta!',
                usuario: user
            }
        }
    }

    async alterar(id: string, body: any) {
        const { login, senha, telefone, nome, admin } = body;

        const user = await this.__usuario.findOne(id); 
        
        if (!user) {
            return { 
                statusCode: 404,
                message: 'Não foi encontrado um usuário com esse ID!',
            }
        }

        if (user.login !== login) {
            const emailExistente = await this.__usuario.findOne({ where: { login }});

            if (emailExistente) {
                return { 
                    statusCode: 400,
                    message: 'Já existe um usuário com esse email!',
                }
            }
        }
        user.login = login;
        user.senha = senha;
        user.telefone = telefone;
        user.nome = nome;

        if (admin) {
            user.admin = admin;
        } else {
            user.admin = false;
        }

        const response = await this.__usuario.save(user);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Salvo com sucesso!',
                user,
            }
        } else {
            throw new HttpException('Erro ao salvar informações do usuario', 400);
        } 
    }
}
