import { Controller, Get, Post, Body } from '@nestjs/common';
import { TiposemeaduraService } from './tiposemeadura.service';

@Controller('tiposemeadura')
export class TipoSemeaduraController {
    constructor(private readonly tiposemeaduraS: TiposemeaduraService) {}

    @Get('/listar')
    async listarTodas() {
        return await this.tiposemeaduraS.listar();
    }

    @Post()
    async salvar(@Body() body: any) {
        return await this.tiposemeaduraS.salvar(body);
    }
}
