import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MascotaEntity} from "./mascota.entity";

@Injectable()
export class MascotaService {
    constructor(
        @InjectRepository(MascotaEntity)
        private repositorio: Repository<MascotaEntity>
    ) {

    }

    crearNuevaMascota(mascota:MascotaEntity){
        return this.repositorio.save(mascota);
    }
}