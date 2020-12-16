import { Injectable } from '@nestjs/common';
import { readFile, readFileSync } from 'fs';

@Injectable()
export class UploadService {
    async upload(body: any) {
        console.log(body);
        //
    }

    async buscarGeojson(body: any) {
        const { caminho } = body;

        console.log(process.cwd());
        const data = readFileSync(caminho, 'utf8');

        return data.toString();
    }
}
