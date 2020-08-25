import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity('mascota')
export class MascotaEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string


    @ManyToOne(
        type=>UsuarioEntity,
        usuario => usuario.mascotas
    )
    usuario:UsuarioEntity


    @OneToMany(type=>VacunaEntity,
        //que entidad nos relacionamos
        vacuna => vacuna.mascota
        //campo con el q relacionamos
    )
    vacunas:VacunaEntity[]


}