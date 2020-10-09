import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Res, Session,
} from '@nestjs/common';
import { TarjetaCreditoService } from './tarjeta-credito.service';
import { TarjetaDto } from './DTO/tarjeta-dto';
import { validate, ValidationError } from 'class-validator';

@Controller('bioapp')
export class TarjetaCreditoController {

  constructor(private _tarjetaService:TarjetaCreditoService) {
  }

  @Get('vistaTarjetas')
  async vistaTarjetas(@Res() res,@Query() parametrosConsulta,@Session() session){

    const estaLogeado = session.usuario
    if(estaLogeado){
      let mensajeError = parametrosConsulta.mensaje

      let respuesta
      try {

        respuesta = await this._tarjetaService.buscarTarjetas(Number(session.usuario))
      }catch (e) {
        throw new InternalServerErrorException({
          mensaje:'Error del Servidor'
        })
      }
      if(respuesta){
        return res.render('tarjetaCredito/tarjetas-credito.ejs',{
          arregloTarjetas:respuesta,
          error:mensajeError,
          usuario:session.usuario,
          rol:session.rol
        })

      }else{
        throw new NotFoundException({
          mensaje:'No existen registros'
        })
      }

    }else{
      return res.redirect('/bioapp/home')
    }

  }

  @Get('vistaAgregarTarjeta')
  vistaAgregarTarjetas(@Res() res,@Query() parametrosConsulta,@Session() session){
    const estaLogeado = session.usuario

    if(estaLogeado){
      const mensajeError = parametrosConsulta.mensaje
      return res.render('tarjetaCredito/agregar.ejs',
        {
          error:mensajeError,
          usuario:session.usuario,
          rol:session.rol
        })
    }else{
      return res.redirect('/bioapp/home')
    }
  }


  @Post('agregarTarjeta')
  async crearTarjeta(
    @Body() parametrosCuerpo,
    @Res() res,
    @Session() session
  ){

    const estaLogeado = session.usuario
    if(estaLogeado){
      const tarjetaValida = new TarjetaDto()

      const fechaCaducidad = new Date(parametrosCuerpo.fechaCaducidad)

      tarjetaValida.tipo = parametrosCuerpo.tipo
      tarjetaValida.numero = parametrosCuerpo.numero
      tarjetaValida.fechaCaducidad = fechaCaducidad
      tarjetaValida.cvv = parametrosCuerpo.cvv

      let errores:ValidationError[]
      parametrosCuerpo.usuario = Number(session.usuario)

      try {
        errores = await validate(tarjetaValida)

      }catch (e) {
        console.log(e);
        const mensaje="Error validando datos";
        return res.redirect('/bioapp/vistaAgregarTarjeta?mensaje='+mensaje)
      }
      if(errores.length > 0){

        let arregloErrores = []

        for(let error of errores){
          arregloErrores.push(error.property)
        }

        const mensaje=arregloErrores;
        return res.redirect('/bioapp/vistaAgregarTarjeta?mensaje='+mensaje)

      }else{

        try {
          await this._tarjetaService.crearTarjeta(parametrosCuerpo)
          return res.redirect(`/bioapp/vistaTarjetas`)
        }catch (e) {
          const mensaje="Tarjeta ya existe";
          return res.redirect('/bioapp/vistaAgregarTarjeta?mensaje='+mensaje)

        }
      }
    }else{
      return res.redirect('/bioapp/home')
    }


  }

  @Get('vistaEditar/:id')
  async vistaEditarTarjeta(
    @Param() parametroRuta,
    @Query() parametrosConsulta,
    @Res() res,
    @Session() session
  ){
    const estaLogeado = session.usuario
    if(estaLogeado){
      const id = Number(parametroRuta.id)
      let tarjetaEncontrada;
      try {
        tarjetaEncontrada = await this._tarjetaService.buscarTarjeta(id)
      }catch (e) {
        return res.redirect(`/bioapp/vistaTarjetas?mensaje=Error buscando tarjeta`)
      }
      if(tarjetaEncontrada){
        return res.render('tarjetaCredito/agregar.ejs',
          {
            error:parametrosConsulta.mensaje,
            tarjeta:tarjetaEncontrada,
            usuario:session.usuario,
            rol:session.rol
          })
      }else {
        return res.redirect(`/bioapp/vistaTarjetas?mensaje=tarjeta no encontrado`);
      }
    }else{
      return res.redirect('/bioapp/home')
    }

  }

  @Post('editarTarjeta/:id')
  async editarTarjeta(
    @Param() parametrosRuta,
    @Body() parametrosCuerpo,
    @Res() res
  ){

    const tarjetaValida = new TarjetaDto()

    const fechaCaducidad = new Date(parametrosCuerpo.fechaCaducidad)

    tarjetaValida.tipo = parametrosCuerpo.tipo
    tarjetaValida.numero = parametrosCuerpo.numero
    tarjetaValida.fechaCaducidad = fechaCaducidad
    tarjetaValida.cvv = parametrosCuerpo.cvv

    const id = Number(parametrosRuta.id)
    parametrosCuerpo.id = id

    let errores:ValidationError[]

    try {
      errores = await validate(tarjetaValida)
    }catch (e) {
      const mensaje = "Error validando datos de la tarjeta de credito"
      return res.redirect('/bioapp/vistaEditar?mensaje='+mensaje)
    }
    if(errores.length > 0){

      const mensaje='Error al editar tarjeta de credito';
      return res.redirect('/bioapp/vistaTarjetas?mensaje='+mensaje)

    }else{
      try {
        await this._tarjetaService.editarTarjeta(parametrosCuerpo)
        return res.redirect(`/bioapp/vistaTarjetas`)

      }catch (e) {
        const mensaje="Error del servidor";
        return res.redirect('/bioapp/vistaTarjetas?mensaje='+mensaje)
      }

    }

  }

  @Post('eliminarTarjeta/:id')
  async eliminarTarjeta(@Param() parametrosRuta,@Res() res){
    const id = Number(parametrosRuta.id)
    try {

      await this._tarjetaService.eliminarTarjeta(id)
      const  mensaje = 'Tarjeta de credito eliminada'
      return res.redirect('/bioapp/vistaTarjetas?mensaje='+mensaje)

    }catch (e) {
      console.log(e);
      const  mensaje = 'Error del servidor'
      return res.redirect('/bioapp/vistaTarjetas?mensaje='+mensaje)
    }
  }

}