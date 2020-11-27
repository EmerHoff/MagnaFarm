import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/models/Usuario';
import { Propriedade } from 'src/models/Propriedade';
import { Talhao } from 'src/models/Talhao';
import { Repository } from 'typeorm';

@Injectable()
export class TalhaoService { 
    constructor(
        @InjectRepository(Usuario)
        private readonly __usuario: Repository<Usuario>,
        @InjectRepository(Propriedade)
        private readonly __propriedade: Repository<Propriedade>,
        @InjectRepository(Talhao)
        private readonly __talhao: Repository<Talhao>
    ) {}

    async listarTodas() {

        const talhoes = await this.__talhao.find({
            relations: ['propriedade']
        });
        
        if (talhoes) {
            return { 
                statusCode: 200,
                message: 'Talhões encontrados!',
                talhoes
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhum talhão encontrado!'
            }
        }
    }

    async listar(id: string) {
        const propriedade = await this.__propriedade.findOne(id);

        if (!propriedade) {
            return { 
                statusCode: 404,
                message: 'Nenhuma propriedade com esse ID encontrada!',
            }
        }

        const talhoes = await this.__talhao.find({ propriedade: propriedade });
        
        if (talhoes) {
            return { 
                statusCode: 200,
                message: 'Talhões encontrados!',
                talhoes
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhum talhão encontrado!'
            }
        }
    }

    async buscar(id: string) {
        const talhao: Talhao = await this.__talhao.findOne({
            where: { id: id },
            relations: ['propriedade'],
          })

        if (talhao) {
            return { 
                statusCode: 200,
                message: 'Talhão encontrado!',
                talhao
            }
        } else {
            return {
                statusCode: 404,
                message: 'Talhão não encontrado!'
            }
        }
    }

    async salvar(body: any) {
        const { nome, area, kml, id_propriedade } = body;

        const propriedade = await this.__propriedade.findOne(id_propriedade); 
        
        if (!propriedade) {
            return { 
                statusCode: 404,
                message: 'Nenhuma propriedade encontrada com esse ID!',
            }
        }

        const talhao: Talhao = new Talhao;
        talhao.nome = nome;
        talhao.area = area;
        talhao.kml = kml;
        talhao.propriedade = propriedade;

        const response = await this.__talhao.save(talhao);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Talhão cadastrado com sucesso!',
                talhao,
            }
        } else {
            throw new HttpException('Erro ao cadastrar talhão', 400);
        } 
    }

    async alterar(id: string, body: any) {
        const { nome, area, kml } = body;

        const talhao = await this.__talhao.findOne(id); 
        
        if (!talhao) {
            return { 
                statusCode: 404,
                message: 'Nenhum talhão encontrado com esse ID!',
            }
        }

        talhao.nome = nome;
        talhao.area = area;
        talhao.kml = kml;

        const response = await this.__talhao.save(talhao);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Salvo com sucesso!',
                talhao,
            }
        } else {
            throw new HttpException('Erro ao atualizar talhão', 400);
        } 
    }
}
