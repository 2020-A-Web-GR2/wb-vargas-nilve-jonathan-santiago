import {
  Body,
  Controller, Get, Post, Query, Req, Res, Session,
} from '@nestjs/common';

import { UsuarioService } from '../usuario/usuario.service';
import { CryptoClass } from '../usuario/clases/Crypto.class';

@Controller('bioapp')
export class LoginController {

  constructor(private readonly _usuarioService:UsuarioService) {
  }


  @Get('vista/login')
  login(@Res() res,@Query() parametrosConsulta){
    return res.render('login/login',{
      mensaje:parametrosConsulta.mensaje,
      login:parametrosConsulta.login
    })
  }

  @Post('login')
  async loginPost(@Res() res, @Body() parametrosCuerpo,@Session() session){

    const login = parametrosCuerpo.login
    const password = parametrosCuerpo.password
    let usuario
    if(login && password){

      try {

        usuario = await this._usuarioService.buscarUsuarioPorLogin(login)

      }catch (e) {
        return res.redirect('/bioapp/vista/login?mensaje=Error del servidor')
      }
    }else{
      return res.redirect('/bioapp/vista/login?mensaje=Ingrese credenciales')
    }

    if(usuario){

      const crypto = new CryptoClass()
      const passwordDesencriptada = crypto.desencriptar(usuario.password)

      if(passwordDesencriptada == password){
        session.login = login
        session.rol = [usuario.tipo]
        session.usuario = (usuario.id).toString()
        return res.redirect('/bioapp/facturas');
      }else{
        return res.redirect('/bioapp/vista/login?mensaje=Credenciales incorrectas&login='+parametrosCuerpo.login)
      }

    }else{
      return res.redirect('/bioapp/vista/login?mensaje=Usuario no existe&login='+parametrosCuerpo.login)
    }
  }


  @Get('logout')
  logout(@Session() session, @Res() res,@Req() req ){
    session.login = undefined
    session.rol = undefined
    session.usuario = undefined
    req.session.destroy()
    return res.redirect('/bioapp/home')
  }


}