import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('medicamento')
export class MedicamentoEntity {

    @PrimaryGeneratedColumn({
        unsigned:true,
        comment:'identificador',
        name:'id'
    })
    id:number

    @Column({
        name:'nombre',
        type:'varchar',
        nullable:false,
        length:'60',
        unique:true
    })
    nombre:string

    @Column({
        name:'descripcion',
        type:'text',
        nullable:true
    })
    descripcion?:string

    @Column({
        name:'precio',
        nullable:false,
        type:'decimal',
        precision:10,//1000000000
        scale:4, //.0001
    })
    precio:number

    @Column({
        name:'cantidadUnidad',
        nullable:false, //indica q es opcional
        type:'varchar',
    })
    cantidadUnidades:string

    @Column({
        nullable:false,
        type:'date',
        name:'fechaCaducidad',
    })
    fechaCaducidad:Date

}