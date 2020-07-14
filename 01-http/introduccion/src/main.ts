import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser')



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  * antes de APP.LISTEN() se debe agregar la conf
  * */

  app.use(cookieParser())
  await app.listen(3001);
}
bootstrap();
