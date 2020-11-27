import { Controller, Get, Put, Post, Param, Body, Query } from '@nestjs/common';
import { TalhaoService } from './talhao.service';

@Controller('talhao')
export class TalhaoController {
    constructor(private readonly talhaoS: TalhaoService) {}

    @Get('/listar')
    async listarTodas() {
        return await this.talhaoS.listarTodas();
    }

    @Get('/listar/:id')
    async listar(@Param('id') id: string) {
        return await this.talhaoS.listar(id);
    }

    @Get(':id')
    async buscar(@Param('id') id: string) {
        return await this.talhaoS.buscar(id);
    }

    @Post()
    async salvar(@Body() body: any) {
        return await this.talhaoS.salvar(body);
    }

    @Put(':id')
    async alterar(@Param('id') id: string, @Body() body: any) {
        return await this.talhaoS.alterar(id, body);
    }
}
