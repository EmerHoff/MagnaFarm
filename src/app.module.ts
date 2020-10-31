//Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Modules
import { UsuarioModule } from './controllers/usuario/usuario.module';
import { PropriedadeModule } from './controllers/propriedade/propriedade.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsuarioModule, PropriedadeModule],
})
export class AppModule {}