import { Controller, Get, Put, Post, Param, Body, Query } from '@nestjs/common';
import { SemeaduraService } from './semeadura.service';

@Controller('semeadura')
export class SemeaduraController { 
    constructor(private readonly semeaduraS: SemeaduraService) {}

    @Get('/listar')
    async listarTodas() {
        return await this.semeaduraS.listarTodas();
    }

    @Get('/listar/:id')
    async listar(@Param('id') id: string) {
        return await this.semeaduraS.listar(id);
    }

    @Get(':id')
    async buscar(@Param('id') id: string) {
        return await this.semeaduraS.buscar(id);
    }

    @Post()
    async salvar(@Body() body: any) {
        return await this.semeaduraS.salvar(body);
    }

    @Post('/declarar')
    async salvarSemeadura(@Body() body: any) {
        return await this.semeaduraS.salvarSemeadura(body);
    }
}
