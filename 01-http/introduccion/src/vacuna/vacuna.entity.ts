import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity() //si no le pongo un nombre se le asignara el nombre de la clase en minusculas y separado por guion
export class VacunaEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string

    @ManyToOne(
        type=>MascotaEntity,
        mascota => mascota.vacunas
    )
    mascota:MascotaEntity

}