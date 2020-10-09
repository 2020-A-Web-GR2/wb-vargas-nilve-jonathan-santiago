import {
  Body,
  Controller, Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post, Put, Query, Res, Session,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioCreateDto } from './DTO/usuario.create-dto';
import { validate, ValidationError } from 'class-validator';
import { UsuarioUpdateDto } from './DTO/usuario.update-dto';
import { CryptoClass } from './clases/Crypto.class';

@Controller('bioapp')
export class UsuarioController {

  constructor(private _usuarioService:UsuarioService) {

  }

  @Get('usuario/vistaRegistro')
  registroUsuario(@Res() res,@Query() parametrosConsulta){

    return res.render('usuario/registro',
      {
        error:parametrosConsulta.error,
        cedula:parametrosConsulta.cedula,
        nombre:parametrosConsulta.nombre,
        apellido:parametrosConsulta.apellido,
        ciudad:parametrosConsulta.ciudad,
        login:parametrosConsulta.login

      })
  }

  @Post('usuario/registrar')
  async crearUsuario(@Body() parametrosCuerpo,@Res() res,@Session() session){

    let idRol:number = 0;
    const usuarioValido = new UsuarioCreateDto();

    usuarioValido.cedula = parametrosCuerpo.cedula
    usuarioValido.nombre = parametrosCuerpo.nombre
    usuarioValido.apellido = parametrosCuerpo.apellido
    usuarioValido.tipo = parametrosCuerpo.tipo
    usuarioValido.login = parametrosCuerpo.login
    usuarioValido.password = parametrosCuerpo.password
    usuarioValido.verificarPassword = parametrosCuerpo.password2

    let errores:ValidationError[]
    let datosUsuarioConsulta;

    try {
      datosUsuarioConsulta = `&cedula=${parametrosCuerpo.cedula}&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}&ciudad=${parametrosCuerpo.ciudad}&login=${parametrosCuerpo.login}`

      errores = await validate(usuarioValido)

    }catch (e) {

      const mensajeError = 'Datos Incorrectos'
      return res.redirect('/bioapp/usuario/vistaRegistro?error='+mensajeError + datosUsuarioConsulta)
    }

    if(errores.length > 0 ){

      let arregloErrores = []

      for(let error of errores){
        arregloErrores.push(error.property)
      }

      const mensajeError=arregloErrores;
      return res.redirect('/bioapp/usuario/vistaRegistro?error='+mensajeError + datosUsuarioConsulta)

    }else{

      if(parametrosCuerpo.tipo){

        idRol = await this._usuarioService.selectQuery('administrador')
      }else{
        idRol = await this._usuarioService.selectQuery('usuario')
      }

      if(parametrosCuerpo.password ==  parametrosCuerpo.password2){


        const crypto = new CryptoClass()
        parametrosCuerpo.password = crypto.encriptar(parametrosCuerpo.password)
        delete parametrosCuerpo.password2;

        try {
          await this._usuarioService.crearUsuario(parametrosCuerpo)
          await this._usuarioService.insertQuery(Number(parametrosCuerpo.id),idRol)

          session.usuario = (parametrosCuerpo.id).toString()
          session.login = parametrosCuerpo.login
          session.rol = [parametrosCuerpo.tipo]
          return res.redirect('/bioapp/facturas')

        }catch (e) {

          const mensajeError = 'Usuario ya existe'

          return res.redirect('/bioapp/usuario/vistaRegistro?error='+mensajeError)

        }
      }else{
        const mensajeError = 'Contraseñas no coinciden'
        return res.redirect('/bioapp/usuario/vistaRegistro?error='+mensajeError+datosUsuarioConsulta)
      }

    }

  }

  @Get('micuenta')
  async micuenta(@Res() res,@Session() session){

    const estasLogeado = session.usuario

    if(estasLogeado){
      let respuesta;
      try {
        respuesta = await this._usuarioService.buscarUno(Number(session.usuario));
      }catch (e) {
        console.log(e);
        throw new InternalServerErrorException({
          mensaje:'Error del Servidor'
        })
      }
      if(respuesta){
        return res.render('usuario/cuenta.ejs',
          {
            usuarioCuenta:respuesta,
            usuario:session.usuario,
            rol:session.rol
          }
        );
      }else{
        throw new NotFoundException({
          mensaje:'No existen registros'
        })
      }

    }else{
      return res.redirect('/bioapp/home')
    }
  }


  @Get('vista/editar/usuario')
  async vistaEditar(@Session() session,@Res() res,@Query() parametrosConsulta){
    const estaLogeado = session.usuario
    if(estaLogeado){
      let respuesta
      try {
        respuesta = await this._usuarioService.buscarUno(Number(session.usuario))
      }catch (e) {
        return res.redirect('/bioapp/home')
      }
      if(respuesta){
        return res.render('usuario/registro',{
          usuarioEncontrado:respuesta,
          error:parametrosConsulta.mensaje,
          usuario:session.usuario,
          rol:session.rol
        })
      }else{
      }

    }else{
      return res.redirect('/bioapp/home')
    }

  }


  @Post('editarUsuario/:id')
  async editarUno(@Param() parametrosRuta,@Body() parametrosCuerpo,@Res() res){

    const usuarioValido = new UsuarioUpdateDto()
    usuarioValido.nombre = parametrosCuerpo.nombre
    usuarioValido.apellido = parametrosCuerpo.apellido
    usuarioValido.ciudad = parametrosCuerpo.ciudad
    usuarioValido.login = parametrosCuerpo.login

    const id = Number(parametrosRuta.id)
    const usuarioEditado = parametrosCuerpo
    usuarioEditado.id = id;
    let errores:ValidationError[]
    let propiedad = []

    try {
      errores = await validate(usuarioValido)
    }catch (e) {
      throw new InternalServerErrorException({
        mensaje:'Error del Servidor'
      })
    }
    if(errores.length > 0 ){

      errores.forEach((objeto)=>{
        propiedad.push(objeto.property)
      })
      return res.redirect('/bioapp/vista/editar/usuario?mensaje=' + propiedad)

    }else{
      try {
        await this._usuarioService.editarUsuario(usuarioEditado)
        return res.redirect('/bioapp/facturas')
      }catch (e) {
        console.log(e);
      }
    }

  }

  @Delete('usuario/:id')
  async eliminarUsuario(@Param() parametrosRuta){
    try {
      const id = Number(parametrosRuta.id)
      const respuesta = await this._usuarioService.eliminarUsuario(id)
      return {
        mensaje:"Usuario con id "+ id + " eliminado"
      }
    }catch (e) {
      throw new InternalServerErrorException({
        mensaje:'Error del Servidor'
      })
    }
  }


}