import { Controller, Get, Put, Post, Param, Body, Query } from '@nestjs/common';
import { AssinaturaService } from './assinatura.service';

@Controller('assinatura')
export class AssinaturaController {
    constructor(private readonly assinaturaS: AssinaturaService) {}

    @Get('/listar')
    async listarTodas() {
        return await this.assinaturaS.listarTodas();
    }

    @Get('/listar/:id')
    async listar(@Param('id') id: string) {
        return await this.assinaturaS.listar(id);
    }

    @Get(':id')
    async buscar(@Param('id') id: string) {
        return await this.assinaturaS.buscar(id);
    }

    @Post()
    async salvar(@Body() body: any) {
        return await this.assinaturaS.salvar(body);
    }
}
