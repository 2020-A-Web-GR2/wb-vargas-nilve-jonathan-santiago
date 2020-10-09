import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { TarjetaCreditoEntity } from '../tarjeta-credito/tarjeta-credito.entity';
import { DetallesEntity } from '../detalles/detalles.entity';

@Entity('factura')
export class FacturaEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: 'Identificador',
    name: 'id'
  })
  id: number;

  @Column({
    name: 'nombreCarrito',
    type: 'varchar',
    nullable: true,
    length:'60'
  })
  nombreCarrito?: string

  @Column({
    nullable:false,
    type:'datetime',
    name:'fecha_hora'
  })
  fechaHora:Date;

  @Column({
    name:'precioTotal',
    nullable:false,
    type:'decimal',
    precision:10,
    scale:4,

  })
  precioTotal:number

  @Column({
    name:'precioTotalConIVA',
    nullable:false,
    type:'decimal',
    precision:10,
    scale:4,
  })
  precioTotalConIVA:number

  @Column({
    name:'tipo',
    type:'enum',
    nullable:false,
    enum: ['factura', 'carrito'],
    default: 'carrito'
  })
  tipo:string;


//relacion con usuario
  @ManyToOne(
    type => UsuarioEntity,
    usuario => usuario.facturas
  )
  usuario:UsuarioEntity

  //relacion con tarjeta
  @ManyToOne(
    type => TarjetaCreditoEntity,
    tarjetas_credito => tarjetas_credito.facturas
  )
  tarjeta_credito:TarjetaCreditoEntity

  //relacion con detalles
  @OneToMany(
    type => DetallesEntity,
    detalles => detalles.factura
  )
  detalles:DetallesEntity[]



}