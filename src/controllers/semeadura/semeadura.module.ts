import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SemeaduraService } from './semeadura.service';
import { SemeaduraController } from './semeadura.controller';
import { Semeadura } from '../../models/Semeadura';
import { Talhao } from 'src/models/Talhao';
import { AssinaturaService } from '../assinatura/assinatura.service';
import { Assinatura } from 'src/models/Assinatura';
import { AssinaturaModule } from '../assinatura/assinatura.module';


@Module({
    imports: [TypeOrmModule.forFeature([Semeadura, Talhao]), AssinaturaModule],
    controllers: [SemeaduraController],
    providers: [SemeaduraService],
})
export class SemeaduraModule { }