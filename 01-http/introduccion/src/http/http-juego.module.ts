
//@Nombre() -> Decorador
import {Module} from "@nestjs/common";

import {HttpJuegoController} from "./http-juego.controller";
import {HttpJuegoService} from "./http-juego.service";

@Module({
    imports:[],
    controllers:[HttpJuegoController],
    providers:[HttpJuegoService],
})
export class HttpJuegoModule {
    
}