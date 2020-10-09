import {Body, Controller, Get, InternalServerErrorException, Param, Post, Query, Res, Session} from "@nestjs/common";
import {MedicamentoDto} from "./DTO/medicamento.dto";
import {validate,ValidationError} from "class-validator";
import {MedicamentoService} from "./medicamento.service";

@Controller('medicamento')
export class MedicamentoController {

    constructor(private readonly _medicamentoService:MedicamentoService) {
    }

    @Get()
    async mostrarMedicamentos(@Res() res,@Query() parametrosConsulta,@Session() session){

        const estaLogeado = session.usuario;

        if (estaLogeado) {

            let medicamentosEncontrados
            try {
                medicamentosEncontrados =  await this._medicamentoService.mostrar(parametrosConsulta.buscar)
            }catch (e) {
                console.log(e)
                throw new InternalServerErrorException({
                    mensaje:'Error del servidor'

                })

            }

            if(medicamentosEncontrados){
                return res.render('medicamento/lista',{
                    arregloMedicamentos:medicamentosEncontrados,
                    mensaje:parametrosConsulta.mensaje,
                    usuario:session.usuario
                })
            }else{
                throw new InternalServerErrorException({
                    mensaje:'no hay medicamentos'
                })
            }
        }else{
            return res.redirect('/login')
        }
    }


    @Get('vista/crear')
    vistaCrear(@Res() res,@Query() parametrosConsulta,@Session() session){

        const estaLogeado = session.usuario;
        if (estaLogeado) {
            return res.render('medicamento/crear', {
                mensaje:parametrosConsulta.mensaje,
                nombre:parametrosConsulta.nombre,
                descripcion:parametrosConsulta.descripcion,
                precio:parametrosConsulta.precio,
                cantidadUnidades:parametrosConsulta.cantidadUnidades,
                fechaCaducidad:parametrosConsulta.fechaCaducidad
            })
        } else {
            return res.redirect('/login')
        }
    }

    @Post('crear')
    async crearMedicamento(@Body() parametrosCuerpo,@Res() res,@Session() session){

        const estaLogeado = session.usuario;
        if (estaLogeado) {
            const medicamentoValido = new MedicamentoDto()
            const fecha = new Date(parametrosCuerpo.fechaCaducidad)
            let errores:ValidationError[]

            medicamentoValido.nombre = parametrosCuerpo.nombre
            medicamentoValido.descripcion = parametrosCuerpo.descripcion
            medicamentoValido.cantidadUnidades = parametrosCuerpo.cantidadUnidades
            medicamentoValido.precio = Number(parametrosCuerpo.precio)
            medicamentoValido.fechaCaducidad = fecha

            let datos = `&nombre=${parametrosCuerpo.nombre}&descripcion=`+
                `${parametrosCuerpo.descripcion}&precio=${parametrosCuerpo.precio}`+
                `&cantidadUnidades=${parametrosCuerpo.cantidadUnidades}&fechaCaducidad=${parametrosCuerpo.fechaCaducidad}`

            try {
                errores = await validate(medicamentoValido)
            }catch (e) {

                return  res.redirect('/medicamento/vista/crear?mensaje=Error validando datos' + datos)
            }

            let propiedad = []
            if(errores.length > 0){
                errores.forEach((error)=>{
                    propiedad.push(error.property)
                })

                return  res.redirect('/medicamento/vista/crear?mensaje=' + propiedad + datos)
            }else{
                try {
                    await this._medicamentoService.crear(parametrosCuerpo)
                    return res.redirect('/medicamento')
                }catch (e) {
                    console.log(e)
                    return  res.redirect('/medicamento/vista/crear?mensaje=Error del servidor' + datos)
                }
            }
        }else{
            return res.redirect('/login')
        }
    }

    @Get('vista/editar/:id')
    async vistaEditarMedicamento(@Param() parametrosRuta,@Res() res,@Query() parametrosConsulta,@Session() session){

        const estaLogeado = session.usuario;
        if (estaLogeado) {
            const id = Number(parametrosRuta.id)
            let medicamento
            try {
                medicamento = await this._medicamentoService.mostrarUno(id)
            }catch (e) {
                return res.redirect('/medicamento?mensaje=Error del servidor')
            }

            if(medicamento){
                return res.render('medicamento/crear',{
                    medicamento:medicamento,
                    mensaje:parametrosConsulta.mensaje
                })
            }else{
                return res.redirect('/medicamento?mensaje=Error del servidor')
            }
        } else {
            return res.redirect('/login')
        }

    }

    @Post('editar/:id')
    async editarMedicamento(@Param() parametrosRuta,@Body() parametrosCuerpo, @Res() res,@Session() session){

        const estaLogeado = session.usuario;
        if (estaLogeado) {
            const medicamentoValido = new MedicamentoDto()

            const id = Number(parametrosRuta.id)
            const fecha = new Date(parametrosCuerpo.fechaCaducidad)
            let errores:ValidationError[]

            medicamentoValido.nombre = parametrosCuerpo.nombre
            medicamentoValido.descripcion = parametrosCuerpo.descripcion
            medicamentoValido.cantidadUnidades = parametrosCuerpo.cantidadUnidades
            medicamentoValido.precio = Number(parametrosCuerpo.precio)
            medicamentoValido.fechaCaducidad = fecha

            let datos = `&nombre=${parametrosCuerpo.nombre}&descripcion=`+
                `${parametrosCuerpo.descripcion}&precio=${parametrosCuerpo.precio}`+
                `&cantidadUnidades=${parametrosCuerpo.cantidadUnidades}&fechaCaducidad=${parametrosCuerpo.fechaCaducidad}`

            try {
                errores = await validate(medicamentoValido)
            }catch (e) {

                return  res.redirect(`/medicamento/vista/editar/${id}?mensaje=Error validando datos` + datos)
            }

            let propiedad = []
            if(errores.length > 0){
                errores.forEach((error)=>{
                    propiedad.push(error.property)
                })

                return  res.redirect(`/medicamento/vista/editar/${id}?mensaje=` + propiedad + datos)
            }else{
                try {
                    parametrosCuerpo.id = id
                    await this._medicamentoService.editar(parametrosCuerpo)
                    return res.redirect('/medicamento')
                }catch (e) {
                    return  res.redirect(`/medicamento/vista/editar/${id}?mensaje=No se pudo editar` + datos)
                }
            }
        } else {
            return res.redirect('/login')
        }
    }

    @Post('eliminar/:id')
    async eliminarMedicamento(@Res() res, @Param() parametrosRuta,@Session() session){

        const estaLogeado = session.usuario;
        if (estaLogeado) {
            const id = Number(parametrosRuta.id)
            try {
                await this._medicamentoService.eliminar(id)
                return res.redirect('/medicamento?mensaje=Medicamento Eliminado')
            }catch (e) {
                return res.redirect('/medicamento?mensaje=No se pudo eliminar')
            }

        } else {
            return res.redirect('/login')
        }
    }

}