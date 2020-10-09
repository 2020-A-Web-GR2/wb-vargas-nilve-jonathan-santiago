import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetallesEntity } from '../detalles/detalles.entity';
import { CategoriaEntity } from '../categoria/categoria.entity';

@Entity('producto')
export class ProductoEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: 'Identificador',
    name: 'id'
  })
  id: number;

  @Column({
    name: 'nombre',
    type: 'varchar',
    nullable: false,
    unique:true,
    length:'100'
  })
  nombre:string

  @Column({
    name: 'imagen',
    type: 'varchar',
    nullable: false,
    unique:true,
  })
  imagen:string

  @Column({
    name: 'descripcion',
    type: 'text',
    nullable: true,
  })
  descripcion?:string

  @Column({
    name:'precio',
    nullable:false,
    type:'decimal',
    precision:10,
    scale:4,
  })
  precio:number

  //relacion con detalles
  @OneToMany(
    type => DetallesEntity,
    detalles => detalles.producto
  )
  detalles:DetallesEntity[]

  //relacion con productoPorCategoria
  @ManyToOne(
    type => CategoriaEntity,
    categoria => categoria.productos
  )
  categoria:CategoriaEntity


}