import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaEntity } from './categoria.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(CategoriaEntity)
    private respository:Repository<CategoriaEntity>
  ) {
  }
  crearCategoria(nuevaCategoria:CategoriaEntity){
    return this.respository.save(nuevaCategoria)
  }
  editarCategoria(categoriaEditada:CategoriaEntity){
    return this.respository.save(categoriaEditada)
  }
  mostrarTodos(){
    return this.respository.find()
  }
  eliminarCategoria(id:number){
    return this.respository.delete(id);
  }
  mostrarUno(nombre:string){
    return this.respository.findOne({ nombre:nombre })
  }

  async mostrarProductosPorCategoria(nombre:string){
    let productos = []
    const consulta = await createQueryBuilder('CategoriaEntity')
      .leftJoinAndSelect('CategoriaEntity.productos', "producto")
      .where("CategoriaEntity.nombre = :nombre", { nombre: nombre })
      .addOrderBy('producto.id','DESC')
      .getMany();

    consulta.forEach((data)=>{
      return productos = data['productos']
    })
    return productos
  }







}