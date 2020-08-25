import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

//index compuesto
//validara que el nombre, apellido y cedula sean unicos

// @Index(['nombre','apellido','cedula'],
//     {unique:true})
@Index([//en q columna nosotros queremos tener indices
    //aqui se especifica el nombre de las propiedades de la clase
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento'
])
//nombre de la tabla usuarios
@Entity('usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true, //este campo no debe repetirse en toda la db
        length: '18'
    })
    cedula: string


    @Column({
        name:'sueldo',
        nullable:true, //indica q es opcional
        type:'decimal',
        precision:10,//1000000000
        scale:4, //.0001

    })
    sueldo?:number //opcional

    @Column({
        nullable:true,
        type:'date',
        name:'fecha_nacimiento',
    })
    fechaNacimiento?:string;

    @Column({
        nullable:true,
        type:'datetime',
        name:'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?:string;


    //relaciones usuario -> mascota
    @OneToMany(type=>MascotaEntity,
        //que entidad nos relacionamos
        mascota => mascota.usuario
        //campo con el q relacionamos
    )
    mascotas:MascotaEntity[]






}