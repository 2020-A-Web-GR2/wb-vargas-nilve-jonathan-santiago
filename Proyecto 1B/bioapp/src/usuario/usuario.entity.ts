import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TarjetaCreditoEntity } from '../tarjeta-credito/tarjeta-credito.entity';
import { FacturaEntity } from '../factura/factura.entity';
import { RolesEntity } from '../roles/roles.entity';

// @Index([
//   'cedula',
//   'nombre',
//   'apellido',
//   'login'
// ])
@Entity('usuario')
export class UsuarioEntity {

  @PrimaryGeneratedColumn({
    unsigned:true,
    comment:'Identificador',
    name:'id'
  })
  id:number

  @Column({
    name:'cedula',
    type:'varchar',
    nullable:false,
    length:'10',
    unique:true
  })
  cedula:string

  @Column({
    name:'nombre',
    type:'varchar',
    nullable:false,
    length:'30'
  })
  nombre:string

  @Column({
    name:'apellido',
    type:'varchar',
    nullable:false,
    length:'30'
  })
  apellido:string

  @Column({
    name: 'tipo',
    type: 'enum',
    nullable: false,
    enum: ['administrador', 'usuario'],
    default: 'usuario'
  })
  tipo: string

  @Column({
    name:'ciudad',
    type:'varchar',
    nullable:true,
    length:'20'
  })
  ciudad?:string

  @Column({
    name:'login',
    type:'varchar',
    nullable:false,
    unique:true,
    length:'30'
  })
  login:string

  @Column({
    name:'password',
    type:'varchar',
    nullable:false,
  })
  password:string

  //Relaciones con tarjetas
  @OneToMany(
    type => TarjetaCreditoEntity,
    tarjetas_credito => tarjetas_credito.usuario
  )
  tarjetas_credito:TarjetaCreditoEntity[]

  //relacion con facturas
  @OneToMany(
    type => FacturaEntity,
    factura => factura.usuario
  )
  facturas:FacturaEntity[]


  //relacion m <-> m con roles
  @ManyToMany(type => RolesEntity)
  @JoinTable()
  roles: RolesEntity[];

}