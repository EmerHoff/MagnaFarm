//Packages
import { Controller, Get, Put, Post, Param, Body, Query, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';

//Services
import { UsuarioService } from './usuario.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

    @Put(':id')
    async alterar(@Param('id') id: string, @Body() body: any) {
        return await this.usuarioS.alterar(id, body);
    }

    @Post('/arquivo')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './storage',
            filename: (req, file, callback) => {
                const name = file.originalname.split('.')[0];
                const fileExtName = file.originalname;
                const randomName = Array(4)
                  .fill(null)
                  .map(() => Math.round(Math.random() * 16).toString(16))
                  .join('');
                callback(null, `${name}-${randomName}${fileExtName}`);
              },
          })
        })
      )
      async uploadedFile(@UploadedFile() file) {
        const response = {
          originalname: file.originalname,
          filename: file.filename,
        };
        return response;
      }
}
