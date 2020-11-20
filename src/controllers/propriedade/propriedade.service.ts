import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/models/Usuario';
import { Propriedade } from 'src/models/Propriedade';
import { Repository } from 'typeorm';

@Injectable()
export class PropriedadeService {
    constructor(
        @InjectRepository(Usuario)
        private readonly __usuario: Repository<Usuario>,
        @InjectRepository(Propriedade)
        private readonly __propriedade: Repository<Propriedade>
    ) {}

    async listarTodas() {

        const propriedades = await this.__propriedade.find();
        
        if (propriedades) {
            return { 
                statusCode: 200,
                message: 'Propriedades encontradas!',
                propriedades
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhuma propriedade encontrada!'
            }
        }
    }

    async listar(id: string) {
        const user = await this.__usuario.findOne(id);

        if (!user) {
            return { 
                statusCode: 404,
                message: 'Nenhum usuário com esse ID encontrado!',
            }
        }

        const propriedades = await this.__propriedade.find({ usuario: user });
        
        if (propriedades) {
            return { 
                statusCode: 200,
                message: 'Propriedades encontradas!',
                propriedades
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhuma propriedade encontrada!'
            }
        }
    }

    async buscar(id: string) {
        const propriedade: Propriedade = await this.__propriedade.findOne(id);

        if (propriedade) {
            return { 
                statusCode: 200,
                message: 'Propriedade encontrada!',
                propriedade
            }
        } else {
            return {
                statusCode: 404,
                message: 'Propriedade não encontrada!'
            }
        }
    }

    async salvar(body: any) {
        const { nome, endereco, comarca, matricula, area, id_usuario } = body;

        const user = await this.__usuario.findOne(id_usuario); 
        
        if (!user) {
            return { 
                statusCode: 404,
                message: 'Nenhum usuário com esse ID encontrado!',
            }
        }

        const propriedade: Propriedade = new Propriedade;
        propriedade.nome = nome;
        propriedade.endereco = endereco;
        propriedade.comarca = comarca;
        propriedade.matricula = matricula;
        propriedade.area = area;
        propriedade.usuario = user;

        const response = await this.__propriedade.save(propriedade);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Cadastrado com sucesso!',
                propriedade,
            }
        } else {
            throw new HttpException('Erro ao cadastrar propriedade', 400);
        } 
    }

    async alterar(id: string, body: any) {
        const { nome, endereco, comarca, matricula, area } = body;

        const propriedade = await this.__propriedade.findOne(id); 
        
        if (!propriedade) {
            return { 
                statusCode: 404,
                message: 'Nenhuma propriedade com esse ID encontrada!',
            }
        }

        propriedade.nome = nome;
        propriedade.endereco = endereco;
        propriedade.comarca = comarca;
        propriedade.matricula = matricula;
        propriedade.area = area;

        const response = await this.__propriedade.save(propriedade);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Salva com sucesso!',
                propriedade,
            }
        } else {
            throw new HttpException('Erro ao atualizar propriedade', 400);
        } 
    }
}
