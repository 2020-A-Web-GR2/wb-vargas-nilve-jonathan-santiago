import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser')
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

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
  app.use(
      session({
        name: 'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false},
        store: new FileStore(),
      }),
  );




  await app.listen(3001);
}
bootstrap();
