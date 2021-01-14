import { Controller, Get, Put, Post, Param, Body, Query } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('arquivo')
export class UploadController {
    constructor(private readonly uploadS: UploadService) {}

    @Post('/geojson')
    async buscarGeojson(@Body() body: any) {
        return await this.uploadS.buscarGeojson(body);
    }

    @Post('/geojson/talhoes')
    async talhoesGeojson(@Body() body: any) {
        return await this.uploadS.talhoesGeojson(body);
    }

    @Post('/polyline/talhoes')
    async polylineGeojson(@Body() body: any) {
        return await this.uploadS.talhoesPolyline(body);
    }

    @Post('/informacoes/talhao')
    async informacoesTalhoes(@Body() body: any) {
        return await this.uploadS.informacoesTalhao(body);
    }

    @Post('/sincronizar/propriedades')
    async sincronizarPropriedades(@Body() body: any) {
        return await this.uploadS.sincronizarPropriedades(body);
    }
    
    @Post('/sincronizar/talhoes')
    async sincronizarTalhoes(@Body() body: any) {
        return await this.uploadS.sincronizarTalhoes(body);
    }
 }
