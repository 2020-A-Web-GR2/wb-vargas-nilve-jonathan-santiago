import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";

@Controller('usuario')
export class UsuarioController {


    public arregloUsuario = [
        {
          id:1,
          nombre:'Adrian'
        },
        {
            id:2,
            nombre:'Vicente'

        },
        {
            id:3,
            nombre:'Wendy'
        },
    ]
    public idActual:number = 3;


    //Mostrar
    @Get()
    mostrarTodos(){
        return this.arregloUsuario
    }

    //crear
    @Post()
    crearUno(@Body() parametrosCuerpo){

        const nuevoUsuario ={
            id:this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        };

        this.arregloUsuario.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }

    //mostrar
    @Get(':id')
    verUno(@Param() parametrosRuta){

        const indice = this.arregloUsuario.findIndex((valorActual)=>{
            return valorActual.id === Number(parametrosRuta.id)
        })

        return this.arregloUsuario[indice]
    }


    //Actualizar
    @Put(':id')
    editarUno(@Param() parametrosRuta,@Body() parametrosCuerpo){

        const indice = this.arregloUsuario.findIndex((valorActual)=>{
            return valorActual.id === Number(parametrosRuta.id)
        })

        this.arregloUsuario[indice].nombre = parametrosCuerpo.nombre
        return this.arregloUsuario[indice]
    }

    //Eliminar
    @Delete(':id')
    eliminarUno(@Param() parametrosRuta){

        const indice = this.arregloUsuario.findIndex((valorActual)=>{
            return valorActual.id === Number(parametrosRuta.id)
        })
        this.arregloUsuario.splice(indice,1);
        return this.arregloUsuario;

    }

}


//Resful -JSON
//Ver todos -> se utilizara el http://localhost:3001/
//Resful Mascota
//Ver todo -> GET Http://localhost:3001/mascota
//Ver Uno
//Get Http://localhost:3001/1
//Crear Uno
//Post Http://localhost:3001/mascota
//Editar Uno
//Put Http://localhost:3001/mascota/1
//eliminar uno
//DELETE Http://localhost:3001/mascota/1
