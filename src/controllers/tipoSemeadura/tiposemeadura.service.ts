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
}