import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssinaturaService } from './assinatura.service';
import { AssinaturaController } from './assinatura.controller';
import { Assinatura } from '../../models/Assinatura';
import { Usuario } from 'src/models/Usuario';

@Module({
    imports: [TypeOrmModule.forFeature([Assinatura, Usuario])],
    controllers: [AssinaturaController],
    providers: [AssinaturaService],
    exports: [AssinaturaService]
})
export class AssinaturaModule { }