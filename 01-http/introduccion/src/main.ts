import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
  * antes de APP.LISTEN() se debe agregar la conf
  * */

  await app.listen(3001);
}
bootstrap();
