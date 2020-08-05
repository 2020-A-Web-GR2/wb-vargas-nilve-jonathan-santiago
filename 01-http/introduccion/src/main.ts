import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser')



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  * antes de APP.LISTEN() se debe agregar la conf
  * */
//utilizar cookies
//app.use(cookieParser())

//utilizar cookies firmadas
app.use(cookieParser('IamyourFather!'));


  await app.listen(3001);
}
bootstrap();
