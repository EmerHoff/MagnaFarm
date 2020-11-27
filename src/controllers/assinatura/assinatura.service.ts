import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/models/Usuario';
import { Propriedade } from 'src/models/Propriedade';
import { Assinatura } from 'src/models/Assinatura';
import { Repository } from 'typeorm';


@Injectable()
export class AssinaturaService { 
    constructor(
        @InjectRepository(Usuario)
        private readonly __usuario: Repository<Usuario>,
        @InjectRepository(Assinatura)
        private readonly __assinatura: Repository<Assinatura>
    ) {}

    async listarTodas() {

        const assinaturas = await this.__assinatura.find({
            relations: ['usuario']
        });
        
        if (assinaturas) {
            return { 
                statusCode: 200,
                message: 'Assinaturas encontradas!',
                assinaturas
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhuma assinatura encontrada!'
            }
        }
    }

    async listar(id: string) {
        const usuario = await this.__usuario.findOne(id);

        if (!usuario) {
            return { 
                statusCode: 404,
                message: 'Nenhum usuário encontrado com esse ID!',
            }
        }

        const assinaturas = await this.__assinatura.find({ usuario: usuario });
        
        if (assinaturas) {
            return { 
                statusCode: 200,
                message: 'Assinaturas encontradas!',
                assinaturas
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhuma assinatura encontrada!'
            }
        }
    }

    async buscar(id: string) {
        const assinatura: Assinatura = await this.__assinatura.findOne({
            where: { id: id },
            relations: ['usuario'],
          })

        if (assinatura) {
            return { 
                statusCode: 200,
                message: 'Assinatura encontrada!',
                assinatura
            }
        } else {
            return {
                statusCode: 404,
                message: 'Assinatura não encontrada!'
            }
        }
    }

    async salvar(body: any) {
        const { quantidade, id_usuario } = body;

        const usuario = await this.__usuario.findOne(id_usuario); 
        
        if (!usuario) {
            return { 
                statusCode: 404,
                message: 'Nenhum usuário encontrado com esse ID!',
            }
        }

        const assinaturaAnterior = await this.__assinatura.findOne({
            where: { usuario: usuario, atual: true },
            relations: ['usuario']
        });

        const assinatura: Assinatura = new Assinatura;
        assinatura.usuario = usuario;
        assinatura.quantidade_contratada = quantidade;
        assinatura.quantidade_total = quantidade;
        assinatura.atual = true;

        if (assinaturaAnterior) {
            assinatura.quantidade_total += assinaturaAnterior.quantidade_total;
            assinaturaAnterior.atual = false;
            await this.__assinatura.save(assinaturaAnterior);
        }

        const response = await this.__assinatura.save(assinatura);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Assinatura cadastrada com sucesso!',
                assinatura,
            }
        } else {
            throw new HttpException('Erro ao cadastrar assinatura', 400);
        } 
    }

    descontarAreaAssinatura(id_usuario: string, area: number) {
        const usuario = this.__usuario.findOne(id_usuario);

        if (!usuario) {
            throw new HttpException('Erro ao encontrar usuário do proprietário na assinatura!', 400);
        }

        const assinatura = this.__assinatura.findOne({
            where: { usuario: usuario, atual: true },
            relations: ['usuario']
        });

        if (!assinatura) {
            throw new HttpException('Erro ao encontrar assinatura do proprietário', 400);
        }

        assinatura.quantidade_total -= area;

        if (assinatura.quantidade_total < 0) {
            throw new HttpException('O proprietário não possui uma assinatura que cubra a área do talhão', 400);
        }

        this.__assinatura.save(assinatura);
    }
}
