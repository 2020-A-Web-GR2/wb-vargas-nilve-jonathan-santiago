import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { CategoriaModule } from '../categoria/categoria.module';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { FacturaModule } from '../factura/factura.module';
import { DetallesModule } from '../detalles/detalles.module';

@Module({
  imports:[
    CategoriaModule,
    FacturaModule,
    DetallesModule,
    TypeOrmModule.forFeature([
    ProductoEntity
    ],'default')
  ],
  controllers:[ProductoController],
  providers:[ProductoService],
  exports:[ProductoService]
})
export class ProductoModule {

}