import {Module} from "@nestjs/common";
import {CalculadoraController} from "./calculadora.controller";

@Module({
    imports:[],
    controllers:[CalculadoraController],
    providers:[],

})
export class CalculadoraModule {}