import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpModule} from './http/http.module'

@Module({
  imports: [

      /*otros modulos*/
      HttpModule

  ],
  controllers: [
      /*controladores APP MODULE*/

      AppController],
  providers: [
      /*servicios APP MODULE*/

      AppService],
})
export class AppModule {}
