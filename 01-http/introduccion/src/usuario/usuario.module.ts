import {Module} from "@nestjs/common";
import {UsuarioController} from './usuario.controller'
import {UsuarioService} from './usuario.service'
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {MascotaModule} from "../mascota/mascota.module";

@Module({

    imports:[

        //importar el module de la mascota para usar el servicio de mascota

        MascotaModule,
        //importamos el typeOrmModule para utilizar la entidad
        TypeOrmModule.forFeature([
            UsuarioEntity
        ],'default')

    ],
    controllers:[UsuarioController],
    providers:[UsuarioService]
    }
)


export class UsuarioModule {
}