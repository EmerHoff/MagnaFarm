import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talhao } from 'src/models/Talhao';
import { Semeadura } from 'src/models/Semeadura';
import { Repository } from 'typeorm';
import { AssinaturaService } from '../assinatura/assinatura.service'
import { readFile, readFileSync } from 'fs';
import { writeFile } from 'fs';
import { writeFileSync } from 'fs';
import { existsSync } from 'fs';
import { appendFileSync } from 'fs';

@Injectable()
export class SemeaduraService { 
    constructor(
        @InjectRepository(Talhao)
        private readonly __talhao: Repository<Talhao>,
        @InjectRepository(Semeadura)
        private readonly __semeadura: Repository<Semeadura>,
        private readonly assinaturaS: AssinaturaService
    ) {}

    async listarTodas() {

        const semeaduras = await this.__semeadura.find({
            relations: ['talhao']
        });
        
        if (semeaduras) {
            return { 
                statusCode: 200,
                message: 'Semeaduras encontradas!',
                semeaduras
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhuma semeadura encontrada!'
            }
        }
    }

    async listar(id: string) {
        const talhao = await this.__talhao.findOne(id);

        if (!talhao) {
            return { 
                statusCode: 404,
                message: 'Nenhum talhão econtrado com esse ID!',
            }
        }

        const semeaduras = await this.__semeadura.find({ talhao: talhao });
        
        if (semeaduras) {
            return { 
                statusCode: 200,
                message: 'Semeaduras encontradas!',
                semeaduras
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhuma semeadura encontrada!'
            }
        }
    }

    async buscar(id: string) {
        const semeadura: Semeadura = await this.__semeadura.findOne({
            where: { id: id },
            relations: ['talhao'],
          })

        if (semeadura) {
            return { 
                statusCode: 200,
                message: 'Semeadura encontrada!',
                semeadura
            }
        } else {
            return {
                statusCode: 404,
                message: 'Semeadura não encontrada!'
            }
        }
    }

    async salvarSemeadura(body: any) {
        const { id_propriedade, id_usuario, id_talhao, dataPlantio, variedade, cultura, ciclo } = body;

        const dataFormated = dataPlantio.split("-")[2] + '-' + dataPlantio.split("-")[1] + '-' + dataPlantio.split("-")[0];

        const content = '{\'sowing_date\': \'' + dataFormated + '\', \'cycle\': ' + ciclo + ', \'crop\': \'' + cultura + '\', \'variedade\': \'' + variedade + '\'}';

        const caminho = './storage/' + id_usuario + '/' +  id_propriedade + '/' + id_talhao + '/sowing_event.txt';

        if (existsSync(caminho)) {
            //file exists
            appendFileSync(caminho, ',\r\n' + content);
        } else {
            writeFile(caminho, content, function (err) {
                if (err) {
                    return { 
                        statusCode: 400,
                        message: 'Erro ao salvar semeadura!'
                    }
                }
            });
        }

        return { 
            statusCode: 200,
            message: 'Semeadura salva!',
            textData: content
        }
    }

    async salvar(body: any) {
        const { plantio, dias, data_plantio, id_talhao } = body;

        const talhao = await this.__talhao.findOne({
            where: { id: id_talhao },
            relations: ['propriedade', 'usuario'],
          }); 
        
        if (!talhao) {
            return { 
                statusCode: 404,
                message: 'Nenhum talhão encontrado com esse ID!',
            }
        }

        const semeaduraAnterior = await this.__semeadura.findOne({
            where: { talhao: talhao, atual: true },
            relations: ['talhao']
        }); 

        if (semeaduraAnterior) {
            return { 
                statusCode: 404,
                message: 'Já existe uma semeadura para esse talhão!',
            }
        }

        const semeadura: Semeadura = new Semeadura;
        semeadura.plantio = plantio;
        semeadura.dias = dias;
        semeadura.atual = true;

        const response = await this.__semeadura.save(semeadura);

        if (response) {
            //remove da assinatura a quantia de area equivalente
            const usuario = talhao.propriedade.usuario;
            const response = await this.assinaturaS.descontarAreaAssinatura(usuario.id, talhao.area);

            if (response.statusCode === 200) {
                return { 
                    statusCode: 200,
                    message: 'Semeadura cadastrada com sucesso!',
                    semeadura,
                }
            } else {
                return { 
                    statusCode: 400,
                    message: 'Erro ao descontar área da assinatura do proprietário!',
                }
            }
        } else {
            throw new HttpException('Erro ao cadastrar semeadura', 400);
        }
    }
}
