//Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Modules
import { UsuarioModule } from './controllers/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsuarioModule],
})
export class AppModule {}