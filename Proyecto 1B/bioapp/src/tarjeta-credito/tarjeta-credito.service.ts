import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TarjetaCreditoEntity } from './tarjeta-credito.entity';

@Injectable()
export class TarjetaCreditoService {
  constructor(@InjectRepository(TarjetaCreditoEntity)
              private repositorio: Repository<TarjetaCreditoEntity>) {
  }

  crearTarjeta(tarjeta:TarjetaCreditoEntity){
    return this.repositorio.save(tarjeta)
  }

  buscarTarjetas(usuarioId:number){
    return this.repositorio.find({
      where:{
        usuario:usuarioId
      },
      order:{
        id:'DESC'
      }
    })
  }

  eliminarTarjeta(id:number){
    return this.repositorio.delete(id)
  }
  editarTarjeta(tarjetaEditada:TarjetaCreditoEntity){
    return this.repositorio.save(tarjetaEditada);
  }

  buscarTarjeta(id:number){
    return this.repositorio.findOne(id)
  }

  buscarTarjetaPorNumero(numero:string){
    return this.repositorio.findOne({
      where:{
        numero:numero
      }
    })
  }
  
}