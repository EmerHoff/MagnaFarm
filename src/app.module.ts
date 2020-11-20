import { UploadModule } from './controllers/files/upload.module';
//Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Modules
import { UsuarioModule } from './controllers/usuario/usuario.module';
import { PropriedadeModule } from './controllers/propriedade/propriedade.module';

@Module({
  imports: [
    UploadModule, TypeOrmModule.forRoot(), UsuarioModule, PropriedadeModule],
})
export class AppModule { }