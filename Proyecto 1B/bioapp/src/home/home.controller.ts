import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Res, Session,
} from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('bioapp')
export class HomeController {

  constructor(private _homeService:HomeService) {
  }

  @Get()
  bioapp(@Res() res,@Session() session){
    const estaLogeado = session.usuario
    if(estaLogeado){
      return res.render('home/bioapp',{
        rol:session.rol,
        usuario:session.usuario
      })
    }else {
      return res.render('home/bioapp')
    }

  }

  @Get('home')
  async mostrarProductos(@Res() res,@Session() session){
    const estaLogeado = session.usuario

    let mascarillas
    let guantes
    let overoles
    try {

      mascarillas = await this._homeService.mostrarProductos('Mascarillas')
      guantes = await this._homeService.mostrarProductos('Guantes')
      overoles = await this._homeService.mostrarProductos('Overoles')

    }catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        mensaje:'Error del servidor'
      })
    }
    if(mascarillas || guantes || overoles){

      if(estaLogeado){
        return res.render(
          'home/home',
          {
            arregloMascarillas:mascarillas,
            arregloGuantes:guantes,
            arregloOveroles:overoles,
            usuario:session.usuario,
            rol:session.rol
          }
        )

      }else{
        return res.render(
          'home/home',
          {
            arregloMascarillas:mascarillas,
            arregloGuantes:guantes,
            arregloOveroles:overoles,
          }
        )
      }

    }else{
      throw new NotFoundException({
        mensaje:'No existe registros'
      })
    }

  }


}