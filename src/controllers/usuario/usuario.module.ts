import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { Usuario } from '../../models/Usuario';

import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [TypeOrmModule.forFeature([Usuario]),
    MulterModule.register({
        dest: '../storage',
      })],
    controllers: [UsuarioController],
    providers: [UsuarioService],
})
export class UsuarioModule {}
