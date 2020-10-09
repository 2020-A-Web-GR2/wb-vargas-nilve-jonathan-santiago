import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FacturaEntity } from './factura.entity';
import { Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class FacturaService {

  constructor(
    @InjectRepository(FacturaEntity)
    private repositorio:Repository<FacturaEntity>) {
  }

  crearFactura(nuevaFactura:FacturaEntity){
    return this.repositorio.save(nuevaFactura)
  }
  editarFactura(facturaEditada){
    return this.repositorio.save(facturaEditada)
  }
  mostrarFactura(tipo:string,idUsuario:number){
    return this.repositorio.findOne({
      where:{
        tipo:tipo,
        usuario:idUsuario
      }
    })
  }
  mostrarFacturas(idUsuario:number){
    return this.repositorio.find(
      {
        where:{
          usuario:idUsuario
      },
      order:{
          id:'DESC'
      }})
  }

  eliminarFactura(id:number){
    return this.repositorio.delete(id)
  }

  async mostrarFinalizarFactura(idFactura:number){
    let consulta: FindManyOptions<FacturaEntity>
    consulta = {
      relations:['usuario','tarjeta_credito','detalles','usuario.tarjetas_credito'],
      where:{
        id:idFactura
      }
    }
    return this.repositorio.findOne(consulta)
  }

  mostrarFacturaDetalles(idFactura:number){
    let consulta: FindManyOptions<FacturaEntity>
    consulta = {
      relations:['detalles'],
      where:{
        id:idFactura
      }
    }
    return this.repositorio.findOne(consulta)
  }



}