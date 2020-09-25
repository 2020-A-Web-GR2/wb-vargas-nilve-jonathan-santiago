import {Body, Controller, Get, Post, Query, Req, Res, Session} from "@nestjs/common";

@Controller()
export class LoginController {

    @Get('login')
    login(@Res() res,@Query() parametrosConsulta){
        return res.render('login/login',{
            mensaje:parametrosConsulta.mensaje
        })
    }

    @Post('login')
    loginPost(
        @Body() parametrosCuerpo,
        @Res() response,
        @Session() session
    ) {
        const usuario = parametrosCuerpo.usuario;
        const password = parametrosCuerpo.password;

        if(usuario && password){
            if (usuario == 'Adrian' && password == '1234') {
                session.usuario = usuario
                return response.redirect('/medicamento');
            } else {
                return response.redirect('/login?mensaje=Credenciales incorrectas')
            }
        }else{
            return response.redirect('/login?mensaje=Ingrese Credenciales')
        }
    }

    @Get('logout')
    logout(@Session() session, @Res() res,@Req() req ){
        session.username = undefined
        req.session.destroy()
        return res.redirect('login')
    }

}