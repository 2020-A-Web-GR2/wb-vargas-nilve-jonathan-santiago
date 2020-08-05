import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from './http/http-juego.module'
import {CalculadoraModule} from "./calculadora/calculadora.module";
import {UsuarioModule} from './usuario/usuario.module'
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [

      /*otros modulos*/
      HttpJuegoModule,
      CalculadoraModule,
      // UsuarioModule,
      // TypeOrmModule.forRoot({
      //     name:'default', //nombre de la conexion
      //     type: 'mysql', //mysql postgress
      //     host: 'localhost', //ip
      //     port: 3306, //puerto
      //     username: 'root', //usuario
      //     password: '2810', //password
      //     database: 'test', //nombre de la base de datos
      //     entities: [//TODAS LAS ENTIDADES Q VAMOS A USAR
      //         UsuarioEntity
      //
      //     ],
      //     synchronize: true,
      //     dropSchema:false, // eliminar datos y el esquema de la base de datos
      // }),

  ],
  controllers: [
      /*controladores APP MODULE*/

      AppController],
  providers: [
      /*servicios APP MODULE*/

      AppService],
})
export class AppModule {}
