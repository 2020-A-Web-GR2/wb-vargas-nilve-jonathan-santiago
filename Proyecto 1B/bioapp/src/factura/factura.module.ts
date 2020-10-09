import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacturaEntity } from './factura.entity';
import { FacturaController } from './factura.controller';
import { FacturaService } from './factura.service';
import { DetallesModule } from '../detalles/detalles.module';
import { TarjetaCreditoModule } from '../tarjeta-credito/tarjeta-credito.module';

@Module({
  imports:[
    TarjetaCreditoModule,
    TypeOrmModule.forFeature([
      FacturaEntity
    ],'default')

  ],
  controllers:[FacturaController],
  providers:[FacturaService],
  exports:[FacturaService]
})
export class FacturaModule {

}