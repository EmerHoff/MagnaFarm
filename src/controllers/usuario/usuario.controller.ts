//Packages
import { Controller, Get, Put, Post, Param, Body, Query } from '@nestjs/common';

//Services
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController { 
    constructor(private readonly usuarioS: UsuarioService) {}

    @Get()
    async listar() {
        return await this.usuarioS.listar();
    }

    @Get(':id')
    async buscar(@Param('id') id: string) {
        return await this.usuarioS.buscar(id);
    }

    @Post()
    async salvar(@Body() body: any) {
        return await this.usuarioS.salvar(body);
    }

    @Post('/login')
    async login(@Body() body: any) {
        return await this.usuarioS.login(body);
    }
}
