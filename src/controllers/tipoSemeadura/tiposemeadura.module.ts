import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TiposemeaduraService } from './tiposemeadura.service';
import { TipoSemeaduraController } from './tiposemeadura.controller';
import { TipoSemeadura } from '../../models/TipoSemeadura';

@Module({
    imports: [TypeOrmModule.forFeature([TipoSemeadura])],
    controllers: [TipoSemeaduraController],
    providers: [TiposemeaduraService],
})
export class TiposemeaduraModule { }