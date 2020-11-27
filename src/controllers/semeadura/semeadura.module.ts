import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SemeaduraService } from './semeadura.service';
import { SemeaduraController } from './semeadura.controller';
import { Semeadura } from '../../models/Semeadura';


@Module({
    imports: [TypeOrmModule.forFeature([Semeadura])],
    controllers: [SemeaduraController],
    providers: [SemeaduraService],
})
export class SemeaduraModule { }