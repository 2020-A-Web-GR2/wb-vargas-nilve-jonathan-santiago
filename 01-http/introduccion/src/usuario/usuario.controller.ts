import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioCreateDto} from "./DTO/usuario.create-dto";
import {validate, ValidationError} from "class-validator";
import {UsuarioUpdateDto} from "./DTO/usuario.update-dto";
import {MascotaService} from "../mascota/mascota.service";

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

    constructor(private readonly _service:UsuarioService,
                private readonly _mascotaService:MascotaService) {
    }



    //Mostrar
    @Get()
    async mostrarTodos(){
        //return this.arregloUsuario

        try {
            const respuesta = await this._service.buscarTodos();
            return respuesta;
        }catch (e) {
            throw new InternalServerErrorException({
                mensaje:'Error del Servidor'
            })
        }

    }

    //crear
    @Post()
    async crearUno(@Body() parametrosCuerpo){

        // const nuevoUsuario ={
        //     id:this.idActual + 1,
        //     nombre: parametrosCuerpo.nombre
        // };
        //
        // this.arregloUsuario.push(nuevoUsuario);
        // this.idActual = this.idActual + 1;
        // return nuevoUsuario;

        //--INCLUIR VALIDACION CREATE USUARIO-DTO
        const usuarioValido = new UsuarioCreateDto();

        let fecha:Date
        let fechaHora:Date
        if(parametrosCuerpo.fechaNacimiento || parametrosCuerpo.fechaHoraNacimiento){
            fecha = new Date(parametrosCuerpo.fechaNacimiento)
            fechaHora = new Date(parametrosCuerpo.fechaHoraNacimiento)
        }else{
            fecha = parametrosCuerpo.fechaNacimiento
            fechaHora = parametrosCuerpo.fechaHoraNacimiento
        }

        usuarioValido.cedula = parametrosCuerpo.cedula
        usuarioValido.nombre = parametrosCuerpo.nombre
        usuarioValido.apellido = parametrosCuerpo.apellido
        usuarioValido.sueldo = parametrosCuerpo.sueldo
        usuarioValido.fechaNacimiento = fecha
        usuarioValido.fechaHoraNacimiento = fechaHora

        try{

            const errores:ValidationError[] = await validate(usuarioValido)
            if(errores.length > 0 ){
                return errores
            }else{
                const respuesta = await this._service.crearUno(parametrosCuerpo)
                return respuesta;
            }


        }catch (e) {
            throw new BadRequestException({
                mensaje:'Error validando datos'
            });
        }


    }

    //mostrar
    @Get(':id')
    async verUno(@Param() parametrosRuta){

        // const indice = this.arregloUsuario.findIndex((valorActual)=>{
        //     return valorActual.id === Number(parametrosRuta.id)
        // })
        //
        // return this.arregloUsuario[indice]
        let respuesta;
        try {
            respuesta = await this._service.buscarUno(Number(parametrosRuta.id));
        }catch (e) {
            throw new InternalServerErrorException({
                mensaje:'Error del Servidor'
            })
        }
        if(respuesta){
            return respuesta;
        }else{
            throw new NotFoundException({
                mensaje:'No existen registros'
            })
        }
    }


    //Actualizar
    @Put(':id')
    async editarUno(@Param() parametrosRuta,@Body() parametrosCuerpo){

        // const indice = this.arregloUsuario.findIndex((valorActual)=>{
        //     return valorActual.id === Number(parametrosRuta.id)
        // })
        //
        // this.arregloUsuario[indice].nombre = parametrosCuerpo.nombre
        // return this.arregloUsuario[indice]

        const usuarioValido = new UsuarioUpdateDto()
        let fecha:Date
        let fechaHora:Date

        if(parametrosCuerpo.fechaNacimiento || parametrosCuerpo.fechaHoraNacimiento){
            fecha = new Date(parametrosCuerpo.fechaNacimiento)
            fechaHora = new Date(parametrosCuerpo.fechaHoraNacimiento)
        }else{
            fecha = parametrosCuerpo.fechaNacimiento
            fechaHora = parametrosCuerpo.fechaHoraNacimiento
        }
        usuarioValido.nombre = parametrosCuerpo.nombre
        usuarioValido.apellido = parametrosCuerpo.apellido
        usuarioValido.sueldo = parametrosCuerpo.sueldo
        usuarioValido.fechaNacimiento = fecha
        usuarioValido.fechaHoraNacimiento = fechaHora

        const id = Number(parametrosRuta.id)
        const usuarioEditado = parametrosCuerpo
        //le asigno el id al objeto
        usuarioEditado.id = id;

        try {

            const errores:ValidationError[] = await validate(usuarioValido)
            if(errores.length > 0 ){
                return errores
            }else{
                const respuesta = await this._service.editarUno(usuarioEditado)
                return respuesta
            }

        }catch (e) {
            throw new InternalServerErrorException({
                mensaje:'Error del Servidor'
            })
        }
    }

    //Eliminar
    @Delete(':id')
    async eliminarUno(@Param() parametrosRuta){

        // const indice = this.arregloUsuario.findIndex((valorActual)=>{
        //     return valorActual.id === Number(parametrosRuta.id)
        // })
        // this.arregloUsuario.splice(indice,1);
        // return this.arregloUsuario;

        const id = Number(parametrosRuta.id)
        try {
            const respuesta = await this._service.eliminarUno(id);
            return {
                mensaje:"registro con id "+ id + " eliminado"
            }
        }catch (e) {
            throw new InternalServerErrorException({
                mensaje:'Error del Servidor'
            })
        }

    }


    //usuario -> mascotas
    //mascotas -> vacunas

    @Post("crearUsuarioYMascota")
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        //validad usuario
        //validad mascota

        let usuarioCreado
        try {

            usuarioCreado = await this._service.crearUno(usuario)
        }catch (e) {

            console.error(e)
            throw new InternalServerErrorException(({
                mensaje:"Error creando usuario",
            }))
        }
        if(usuarioCreado){
            mascota.usuario = usuarioCreado.id
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota)

            }catch (e) {
                console.error(e)
                throw new InternalServerErrorException({
                    mensaje:"error creando mascota"
                })
            }

            if(mascotaCreada){
                return {
                    mascota:mascotaCreada,
                    usuario:usuarioCreado
                }
            }else{
                throw new InternalServerErrorException({
                    mensaje:"error creando mascota"
                })
            }

        }
        throw new InternalServerErrorException({
            mensaje:"error creando usuario"
        })

    }

    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
       const nombreControlador = 'Jonathan Vargas'
        res.render(
            'usuario/ejemplo',// Nombre de la vista (archivo)

            {// Parametros de la vista
                nombre:nombreControlador
            }
        )

    }

    @Get('vista/faq')
    faq(@Res() res){

        res.render('usuario/faq')//ruta
    }

    // @Get('vista/inicio')
    // inicio(@Res() res){
    //     res.render('usuario/inicio')//ruta
    // }

    @Get('vista/inicio')
    async inicio(@Res() res){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._service.buscarTodos();
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if (resultadoEncontrado) {
            res.render(
                'usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado
                });
        } else {
            throw new NotFoundException('No se encontraron usuarios')
        }
    }

    @Get('vista/login')
    login(@Res() res){
        res.render('usuario/login')//ruta
    }


    @Get('vista/crear')
    crearUsuarioVista(@Res() res,@Query() parametrosConsulta){
        return res.render('usuario/crear',
            {
                error:parametrosConsulta.error,
                nombre:parametrosConsulta.nombre,
                apellido:parametrosConsulta.apellido,
                cedula:parametrosConsulta.cedula
            }
        )
    }

    @Post('crearDesdeVista')
    async crearDesdeVista(@Body() parametrosCuerpo, @Res() res){

        let nombreApellidoConsulta
        let cedulaConsulta


        if(parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido){
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`

            if(parametrosCuerpo.cedula.length === 10){
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            }else{
                //para errores de usuario
                //throw new BadRequestException('Enviar cedula(10) nombre y apellido')

                const mensajeError = 'Cedula Incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)


            }
        }else{
            //para errores de usuario
            //throw new BadRequestException('Enviar cedula(10) nombre y apellido')

            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }

        let respuestaCreacionUsuario;
        
        try {
            respuestaCreacionUsuario = await this._service.crearUno(parametrosCuerpo)

        }catch (error) {
            //console.error(error)
            //throw new InternalServerErrorException('Error creando usuario')

            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }

        if(respuestaCreacionUsuario){
            return res.redirect('/usuario/vista/inicio')
        }else{
            //throw  new InternalServerErrorException('Error creando usuario')

            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);

        }
        
        
    }

    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._service.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
        }
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
