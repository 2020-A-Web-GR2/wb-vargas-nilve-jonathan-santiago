import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallesEntity } from './detalles.entity';

@Injectable()
export class DetallesService {

  constructor(
    @InjectRepository(DetallesEntity)
    private repositorio:Repository<DetallesEntity>
  ) {
  }

  crearDetalle(nuevoDetalle:DetallesEntity){
    return this.repositorio.save(nuevoDetalle)
  }
  mostrarDetalle(id:number){
    return this.repositorio.findOne(id)
  }

  mostrarDetalles(){
    return this.repositorio.find()
  }
   editarDetalle(detalleEditado:DetallesEntity){
    return this.repositorio.save(detalleEditado)
   }

   eliminarDetalle(id:number){
    return this.repositorio.delete(id)
   }



  
}