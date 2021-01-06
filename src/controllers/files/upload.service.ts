import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { readFile, readFileSync } from 'fs';

@Injectable()
export class UploadService {

    async buscarGeojson(body: any) {
        let { caminho } = body;

        if (!caminho) {
            return null;
        }

        caminho = './storage/' + caminho;

        const data = readFileSync(caminho, 'utf8');
        
        if (data) {
            if (data.includes('FeatureCollection')) {
                return data.toString();
            } else {
                return {
                    type: "FeatureCollection",
                    name: "teste",
                    crs: {
                        type: "name",
                        properties: {
                            name: "urn:ogc:def:crs:OGC:1.3:CRS84"
                        }
                    },
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                Name: null,
                                description: null,
                                gridcode: 1
                            },
                            geometry: JSON.parse(data.toString())
                        }
                    ]
                }
            }
        }

        return null;
    }

    async talhoesGeojson(body: any) {
        let { caminho } = body;

        if (!caminho) {
            return null;
        }

        caminho = './storage/' + caminho;

        const talhoes = [];

        readdirSync(caminho, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).forEach(file => {
            const caminhoTalhao = caminho + file.name + '/field_' + file.name + '_json.txt';
            const data = readFileSync(caminhoTalhao, 'utf8');

            if (data) {
                if (data.includes('FeatureCollection')) {
                    talhoes.push(data.toString());
                } else {
                    talhoes.push({
                        type: "FeatureCollection",
                        name: file.name,
                        crs: {
                            type: "name",
                            properties: {
                                name: "urn:ogc:def:crs:OGC:1.3:CRS84"
                            }
                        },
                        features: [
                            {
                                type: "Feature",
                                properties: {
                                    Name: null,
                                    description: null,
                                    gridcode: 1
                                },
                                geometry: JSON.parse(data.toString())
                            }
                        ]
                    });
                }
            }
        });

        return talhoes;
    }

    async talhoesPolyline (body: any) {
        let { caminho } = body;

        if (!caminho) {
            return null;
        }

        caminho = './storage/' + caminho;

        const talhoes = [];

        readdirSync(caminho, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).forEach(file => {
            const fileName = file.name;
            const caminhoTalhao = caminho + fileName + '/field_' + fileName + '_json.txt';
            const data = readFileSync(caminhoTalhao, 'utf8');

            if (data) {
                const jsonTalhao = JSON.parse(data.toString());

                const talhaoPolyline = [];

                jsonTalhao['coordinates'][0].forEach(coord => {
                    talhaoPolyline.push({
                        latitude: coord[1],
                        longitude: coord[0],
                    });
                });

                talhoes.push({
                    talhao: fileName,
                    coordenadas: talhaoPolyline
                });
            }
        });

        return talhoes;
    }

    replaceAll(str: string, needle: string, replacement: string) {
        return str.split(needle).join(replacement);
    }

    async informacoesTalhao (body: any) {
        let { caminho } = body;

        if (!caminho) {
            return null;
        }

        caminho = './storage/' + caminho;

        const data = readFileSync(caminho, 'utf8');
        
        const formated = this.replaceAll(data.toString(), "'", "\"");

        if (data) {
            return JSON.parse(formated);
        }
    }
}
