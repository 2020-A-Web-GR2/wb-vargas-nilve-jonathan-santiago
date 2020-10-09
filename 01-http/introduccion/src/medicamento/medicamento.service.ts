import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class MedicamentoService {

    constructor(
        @InjectRepository(MedicamentoEntity)
        private repositorio:Repository<MedicamentoEntity>) {
    }

    crear(medicamento:MedicamentoEntity){
        return this.repositorio.save(medicamento)
    }

    mostrar(textoConsulta?:string){
        const consulta: FindManyOptions<MedicamentoEntity> = {
            where:[
                {
                    nombre:Like(`%${textoConsulta}%`)
                },{
                    descripcion:Like(`%${textoConsulta}%`)
                }
            ]
        }

        return this.repositorio.find(consulta)
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