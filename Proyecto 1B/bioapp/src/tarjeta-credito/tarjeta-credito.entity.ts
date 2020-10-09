import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { FacturaEntity } from '../factura/factura.entity';

@Index([
  'numero',
  'fechaCaducidad',
  'cvv'
])
@Entity('tarjeta_credito')
export class TarjetaCreditoEntity {

  @PrimaryGeneratedColumn({
    unsigned: true,
    comment: 'Identificador',
    name: 'id'
  })
  id: number;

  @Column({
    name: 'tipo',
    type: 'varchar',
    nullable: false,
    length: '20'
  })
  tipo: string

  @Column({
    name: 'numero',
    type: 'varchar',
    nullable: false,
    unique: true,
    length: '18'
  })
  numero: string

  @Column({
    name:'fecha_caducidad',
    nullable:false,
    type:'date',
  })
  fechaCaducidad:Date;

  @Column({
    name: 'cvv',
    type: 'varchar',
    nullable: false,
    length: '4'
  })
  cvv: string

  //relacion con usuario
  @ManyToOne(
    type => UsuarioEntity,
    usuario => usuario.tarjetas_credito
  )
  usuario:UsuarioEntity

  //relacion con facturas
  @OneToMany(
    type => FacturaEntity,
    factura => factura.tarjeta_credito
  )
  facturas:FacturaEntity[]
  
}