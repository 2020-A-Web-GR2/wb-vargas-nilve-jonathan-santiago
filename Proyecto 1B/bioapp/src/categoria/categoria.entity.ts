import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';

@Entity('categoria')
export class CategoriaEntity {
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
    length:'30'
  })
  nombre: string

  @Column({
    name: 'descripcion',
    type: 'text',
    nullable: true,
  })
  descripcion: string

  //relacion con productos
  @OneToMany(
    type => ProductoEntity,
    producto => producto.categoria
  )
  productos:ProductoEntity[]
  
}