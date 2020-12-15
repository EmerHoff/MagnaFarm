import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TalhaoService } from './talhao.service';
import { TalhaoController } from './talhao.controller';
import { Talhao } from '../../models/Talhao';
import { Propriedade } from 'src/models/Propriedade';

@Module({
    imports: [TypeOrmModule.forFeature([Talhao, Propriedade])],
    controllers: [TalhaoController],
    providers: [TalhaoService],
})
export class TalhaoModule { }
