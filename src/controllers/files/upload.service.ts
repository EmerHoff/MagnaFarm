import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
    async upload(body: any) {
        console.log(body);
        //
    }
}
