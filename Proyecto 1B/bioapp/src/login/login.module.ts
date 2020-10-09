import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports:[PassportModule,UsuarioModule],
  controllers:[LoginController],
  providers:[LoginService]
})
export class LoginModule {


}