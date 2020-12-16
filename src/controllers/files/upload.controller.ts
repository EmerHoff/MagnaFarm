import { Controller, Get, Put, Post, Param, Body, Query } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('arquivo')
export class UploadController {
    constructor(private readonly uploadS: UploadService) {}

    @Post('/upload')
    async upload(@Body() body: any) {
        return await this.uploadS.upload(body);
    }

    @Post('/geojson')
    async buscarGeojson(@Body() body: any) {
        return await this.uploadS.buscarGeojson(body);
    }
 }
