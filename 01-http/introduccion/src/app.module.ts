import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from './http/http-juego.module'

@Module({
  imports: [

      /*otros modulos*/
      HttpJuegoModule

  ],
  controllers: [
      /*controladores APP MODULE*/

      AppController],
  providers: [
      /*servicios APP MODULE*/

      AppService],
})
export class AppModule {}
