import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      RolesEntity
    ],'default')
  ],
  controllers:[RolesController],
  providers:[RolesService]
})
export class RolesModule {
  
}