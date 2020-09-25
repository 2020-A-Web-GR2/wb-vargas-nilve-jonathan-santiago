import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {Repository} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()
export class MedicamentoService {

    constructor(
        @InjectRepository(MedicamentoEntity)
        private repositorio:Repository<UsuarioEntity>) {
    }

    crear(medicamento:MedicamentoEntity){
        return this.repositorio.save(medicamento)
    }

    mostrar(){
        return this.repositorio.find()
    }

    editar(medicamento:MedicamentoEntity){
        return this.repositorio.save(medicamento)
    }

    mostrarUno(id:number){
        return this.repositorio.findOne(id)
    }
    eliminar(id:number){
        return this.repositorio.delete(id)
    }

}