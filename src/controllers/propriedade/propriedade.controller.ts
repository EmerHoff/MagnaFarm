//Packages
import { Controller, Get, Put, Post, Param, Body, Query } from '@nestjs/common';

import { PropriedadeService } from './propriedade.service';

@Controller('propriedade')
export class PropriedadeController {
    
    constructor(private readonly propriedadeS: PropriedadeService) {}

    @Get('/listar/:id')
    async listar(@Param('id') id: string) {
        return await this.propriedadeS.listar(id);
    }

    @Get(':id')
    async buscar(@Param('id') id: string) {
        return await this.propriedadeS.buscar(id);
    }

    @Post()
    async salvar(@Body() body: any) {
        return await this.propriedadeS.salvar(body);
    }
}
