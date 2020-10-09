import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { createQueryBuilder, FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private repositorio:Repository<ProductoEntity>
  ) {
  }

  productos(textoConsulta?:string){
    const consulta : FindManyOptions<ProductoEntity> = {
      relations:['categoria'],
      where:[
        {nombre:Like(`%${textoConsulta}%`)},
        {descripcion:Like(`%${textoConsulta}%`)}
      ],
      order:{
        id:'DESC'
      }

    }
    return this.repositorio.find(consulta)
  }


  mostrarTodos(textoConsulta?:string){
    return this.repositorio.find({
      where:[
        {nombre:Like(`%${textoConsulta}%`)},
        {descripcion:Like(`%${textoConsulta}%`)}
      ]
    })
  }

  mostrarUno(id:number){
   return this.repositorio.findOne(id,{relations: ["categoria"]})
  }
  eliminarProducto(id:number){
    return this.repositorio.delete(id)
  }
  crearProducto(nuevoProducto:ProductoEntity){
    return this.repositorio.save(nuevoProducto)
  }
  editarProducto(productoEditado:ProductoEntity){
    return this.repositorio.save(productoEditado)
  }



  async productosYCategoria(categoria:string) {

    const consulta = await createQueryBuilder('ProductoEntity')
      .leftJoinAndSelect('ProductoEntity.categoria', "categoria")
      .where("categoria.nombre = :nombre", { nombre: categoria })
      .addOrderBy('ProductoEntity.id','DESC')
      .limit(5)
      .getMany();
    return consulta
  }





}