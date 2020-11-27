import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TalhaoService } from './talhao.service';
import { TalhaoController } from './talhao.controller';
import { Talhao } from '../../models/Talhao';

@Module({
    imports: [TypeOrmModule.forFeature([Talhao])],
    controllers: [TalhaoController],
    providers: [TalhaoService],
})
export class TalhaoModule { }
