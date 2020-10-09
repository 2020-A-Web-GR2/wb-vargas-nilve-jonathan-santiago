import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario/usuario.entity';
import { ProductoEntity } from './producto/producto.entity';
import { CategoriaEntity } from './categoria/categoria.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductoModule } from './producto/producto.module';
import { FacturaModule } from './factura/factura.module';
import { FacturaEntity } from './factura/factura.entity';
import { TarjetaCreditoModule } from './tarjeta-credito/tarjeta-credito.module';
import { TarjetaCreditoEntity } from './tarjeta-credito/tarjeta-credito.entity';
import { DetallesModule } from './detalles/detalles.module';
import { DetallesEntity } from './detalles/detalles.entity';
import { RolesEntity } from './roles/roles.entity';
import { RolesModule } from './roles/roles.module';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    CategoriaModule,
    UsuarioModule,
    ProductoModule,
    FacturaModule,
    TarjetaCreditoModule,
    DetallesModule,
    RolesModule,
    HomeModule,
    LoginModule,
    TypeOrmModule.forRoot({
      name:'default', //nombre de la conexion
      type: 'mysql', //mysql postgress
      host: 'localhost', //ip
      port: 3306, //puerto
      username: 'root', //usuario
      password: '2810', //password
      database: 'bioappdb', //nombre de la base de datos
      entities: [//TODAS LAS ENTIDADES Q VAMOS A USAR
        UsuarioEntity,
        ProductoEntity,
        CategoriaEntity,
        FacturaEntity,
        TarjetaCreditoEntity,
        DetallesEntity,
        RolesEntity,
        DetallesEntity,
        FacturaEntity
      ],
      synchronize: true,
      dropSchema:false,
    }),


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
