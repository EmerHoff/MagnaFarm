import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readdirSync } from 'fs';
import { readFile, readFileSync } from 'fs';

@Injectable()
export class UploadService {

    //Caminho onde buscará os arquivos das propriedades/talhoes
    caminhoStorage = './storage/';

    async buscarGeojson(body: any) {
        let { caminho } = body;

        if (!caminho) {
            return null;
        }

        caminho = this.caminhoStorage + caminho;

        if (! existsSync(caminho)) {
            return null;
        }

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

        caminho = this.caminhoStorage + caminho;

        if (! existsSync(caminho)) {
            return null;
        }

        const talhoes = [];

        readdirSync(caminho, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).forEach(file => {
            const caminhoTalhao = caminho + file.name + '/field_' + file.name + '_json.txt';

            if (! existsSync(caminhoTalhao)) {
                return null;
            }

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

        caminho = this.caminhoStorage + caminho;

        if (! existsSync(caminho)) {
            return null;
        }

        const talhoes = [];

        readdirSync(caminho, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).forEach(file => {
            const fileName = file.name;
            const caminhoTalhao = caminho + fileName + '/field_' + fileName + '_json.txt';

            if (! existsSync(caminhoTalhao)) {
                return null;
            }

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

        caminho = this.caminhoStorage + caminho;

        if (! existsSync(caminho)) {
            return null;
        }

        const data = readFileSync(caminho, 'utf8');
        
        const formated = this.replaceAll(data.toString(), "'", "\"");

        if (data) {
            return JSON.parse(formated);
        }
    }

    async sincronizarPropriedades (body: any) {
        let { caminho } = body;

        if (!caminho) {
            return null;
        }

        caminho = this.caminhoStorage + caminho;

        if (! existsSync(caminho)) {
            return null;
        }

        const propriedades = [];

        readdirSync(caminho, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).forEach(propDir => {
            const propName = propDir.name;
            const arquivos = [];
            const caminhoPropriedade = caminho + propName + '/';

            if (! existsSync(caminhoPropriedade)) {
                return null;
            }

            readdirSync(caminhoPropriedade, { withFileTypes: true }).filter(dirent => dirent.isFile()).forEach(file => {
               const data = readFileSync(caminhoPropriedade + file.name, 'utf8');

                arquivos.push({
                    nome: file.name,
                    data: data.toString()
                });
            });

            propriedades.push({
                nome: propName,
                arquivos: arquivos
            });
        });

        return {
            propriedades: propriedades
        };
    }

    async sincronizarTalhoes (body: any) {
        let { caminho } = body;

        if (!caminho) {
            return null;
        }

        caminho = this.caminhoStorage + caminho;

        if (! existsSync(caminho)) {
            return null;
        }

        const talhoes = [];

        readdirSync(caminho, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).forEach(talhaoDir => {
            const talhaoDirName = talhaoDir.name;
            const arquivos = [];
            const caminhoTalhao = caminho + talhaoDirName + '/';

            if (! existsSync(caminhoTalhao)) {
                return null;
            }

            readdirSync(caminhoTalhao, { withFileTypes: true }).filter(dirent => dirent.isFile()).forEach(file => {
               const data = readFileSync(caminhoTalhao + file.name, 'utf8');

                arquivos.push({
                    nome: file.name,
                    data: data.toString()
                });
            });

            talhoes.push({
                nome: talhaoDirName,
                arquivos: arquivos
            });
        });

        return {
            talhoes: talhoes
        };
    }

    async buscarNDVI (body: any) {
        const { caminho, dateNDVI } = body;

        if (!caminho) {
            return null;
        }

        if (!dateNDVI) {
            return null;
        }
        const caminhoNDVI = this.caminhoStorage + caminho + dateNDVI + '/temp/workspace/';

        if (! existsSync(caminhoNDVI)) {
            return null;
        }

        //NDVI
        const dataNDVI = readFileSync(caminhoNDVI + '0001_NDVI.png', 'base64');

        return { 
            nome: '0001_NDVI.png',
            data: dataNDVI.toString()
        };
    }

    async buscarRGB (body: any) {
        const { caminho, dateNDVI } = body;

        if (!caminho) {
            return null;
        }

        if (!dateNDVI) {
            return null;
        }
        const caminhoNDVI = this.caminhoStorage + caminho + dateNDVI + '/temp/workspace/';

        if (! existsSync(caminhoNDVI)) {
            return null;
        }

        //RGB
        const dataRGB = readFileSync(caminhoNDVI + '0001_RGB.png', 'base64');

        return { 
            nome: '0001_RGB.png',
            data: dataRGB.toString()
        };
    }
}
