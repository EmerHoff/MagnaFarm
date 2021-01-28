import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoSemeadura } from 'src/models/TipoSemeadura';
import { Repository } from 'typeorm';

@Injectable()
export class TiposemeaduraService { 
    constructor(
        @InjectRepository(TipoSemeadura)
        private readonly __tiposemeadura: Repository<TipoSemeadura>,
    ) {}

    async listar() {

        const semeaduras = await this.__tiposemeadura.find({});
        
        if (semeaduras) {
            return { 
                statusCode: 200,
                message: 'Tipos de semeaduras encontradas!',
                semeaduras
            }
        } else {
            return {
                statusCode: 404,
                message: 'Nenhum tipo de semeadura encontrado!'
            }
        }
    }

    async salvar(body: any) {
        const { cultivo, ciclo } = body;

        const semeadura: TipoSemeadura = new TipoSemeadura;
        semeadura.cultivo = cultivo;
        semeadura.ciclo = ciclo;

        const response = await this.__tiposemeadura.save(semeadura);

        if (response) {
            return { 
                statusCode: 200,
                message: 'Tipo de semeadura cadastrada com sucesso!',
                semeadura,
            }
        } else {
            throw new HttpException('Erro ao cadastrar tipo de semeadura', 400);
        } 
    }
}