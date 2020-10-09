import { Module } from '@nestjs/common';
import { ProductoModule } from '../producto/producto.module';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';

@Module({
  imports:[ProductoModule],
  controllers:[HomeController],
  providers:[HomeService]
})
export class HomeModule {

}