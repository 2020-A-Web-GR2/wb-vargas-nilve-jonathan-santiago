import {Module} from "@nestjs/common";
import {MedicamentoService} from "./medicamento.service";
import {MedicamentoController} from "./medicamento.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MedicamentoEntity} from "./medicamento.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            MedicamentoEntity
        ],'default')
    ],
    providers:[MedicamentoService],
    controllers:[MedicamentoController]
})
export class MedicamentoModule {

}