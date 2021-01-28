import { TiposemeaduraModule } from './controllers/tipoSemeadura/tiposemeadura.module';
//Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Modules
import { UsuarioModule } from './controllers/usuario/usuario.module';
import { PropriedadeModule } from './controllers/propriedade/propriedade.module';
import { AssinaturaModule } from './controllers/assinatura/assinatura.module';
import { SemeaduraModule } from './controllers/semeadura/semeadura.module';
import { TalhaoModule } from './controllers/talhao/talhao.module';
import { UploadModule } from './controllers/files/upload.module';

@Module({
  imports: [
    TiposemeaduraModule,
    TypeOrmModule.forRoot(),
    AssinaturaModule,
    SemeaduraModule,
    TalhaoModule,
    UploadModule, 
    UsuarioModule, 
    PropriedadeModule],
})
export class AppModule { }