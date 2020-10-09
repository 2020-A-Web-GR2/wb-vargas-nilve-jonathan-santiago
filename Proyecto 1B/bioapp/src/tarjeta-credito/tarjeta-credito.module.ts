import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarjetaCreditoEntity } from './tarjeta-credito.entity';
import { TarjetaCreditoController } from './tarjeta-credito.controller';
import { TarjetaCreditoService } from './tarjeta-credito.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      TarjetaCreditoEntity
    ],'default')
  ],
  controllers:[TarjetaCreditoController],
  providers:[TarjetaCreditoService],
  exports:[TarjetaCreditoService]
})
export class TarjetaCreditoModule {

  
}