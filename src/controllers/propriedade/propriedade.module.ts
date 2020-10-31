import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropriedadeService } from './propriedade.service';
import { PropriedadeController } from './propriedade.controller';
import { Propriedade } from '../../models/Propriedade';
import { Usuario } from '../../models/Usuario';

@Module({
    imports: [TypeOrmModule.forFeature([Propriedade, Usuario])],
    controllers: [PropriedadeController],
    providers: [PropriedadeService,],
})
export class PropriedadeModule { }