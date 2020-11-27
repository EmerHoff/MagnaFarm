import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssinaturaService } from './assinatura.service';
import { AssinaturaController } from './assinatura.controller';
import { Assinatura } from '../../models/Assinatura';

@Module({
    imports: [TypeOrmModule.forFeature([Assinatura])],
    controllers: [AssinaturaController],
    providers: [AssinaturaService],
})
export class AssinaturaModule { }