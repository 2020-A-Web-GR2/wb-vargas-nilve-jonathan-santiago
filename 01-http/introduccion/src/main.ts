import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser')
const express = require('express');


async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;

  /*
  * antes de APP.LISTEN() se debe agregar la conf
  * */
//utilizar cookies
//app.use(cookieParser())

//utilizar cookies firmadas
  app.use(cookieParser('IamyourFather!'));

  //------------------------------------------
  app.set('view engine','ejs') //motor para las vistas EJS
  app.use(express.static('publico'))//para poner un servidor web static
  await app.listen(3001);
}
bootstrap();
