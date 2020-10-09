import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesEntity } from './detalles.entity';
import { DetallesController } from './detalles.controller';
import { DetallesService } from './detalles.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([
      DetallesEntity
    ],'default')

  ],
  controllers:[DetallesController],
  providers:[DetallesService],
  exports:[DetallesService]
})
export class DetallesModule {
  
}