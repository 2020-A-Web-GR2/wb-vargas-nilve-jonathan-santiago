import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FacturaEntity } from '../factura/factura.entity';
import { ProductoEntity } from '../producto/producto.entity';

@Entity('detalles')
export class DetallesEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: 'Identificador',
    name: 'id'
  })
  id: number;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    nullable: true,
  })
  descripcion?: string

  @Column({
    name: 'cantidad',
    type:'int',
    nullable:false,
    unsigned: true,
  })
  cantidad: number

  @Column({
    name: 'precioUnitario',
    type:'decimal',
    precision:10,
    scale:4,
    nullable:false
  })
  precioUnitario: number

  @Column({
    name: 'precioTotal',
    type:'decimal',
    precision:10,
    scale:4,
    nullable:false
  })
  precioTotal: number

  //relacion con factura
  @ManyToOne(
    type => FacturaEntity,
    factura => factura.detalles,{ onDelete: 'CASCADE' }
  )
  factura:FacturaEntity

  //relacion con producto
  @ManyToOne(
    type => ProductoEntity,
    producto => producto.detalles
  )
  producto:ProductoEntity


}