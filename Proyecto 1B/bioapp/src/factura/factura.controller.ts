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
import { FacturaService } from './factura.service';
import { FacturaDto } from './DTO/factura-dto';
import { FacturaEntity } from './factura.entity';
import { TarjetaCreditoService } from '../tarjeta-credito/tarjeta-credito.service';

@Controller('bioapp')
export class FacturaController {
  constructor(private readonly _facturaService:FacturaService,
              private readonly _tarjetaCreditoService:TarjetaCreditoService) {
  }

  @Get('facturas')
  async mostrarFacturas(@Res() res,@Query() parametrosConsulta,@Session() session,){

    const estaLogeado = session.usuario;

    if(estaLogeado){
      let idUsuario = Number(session.usuario)
      let respuesta;
      let mensajeError = parametrosConsulta.mensaje
      try {
        respuesta = await this._facturaService.mostrarFacturas(idUsuario)
      }catch (e) {
        throw new InternalServerErrorException('error del servidor')
      }
      if(respuesta){
        return res.render('factura/facturas.ejs',
          {
            arregloFacturas:respuesta,
            error:mensajeError,
            mensaje:parametrosConsulta.compra,
            usuario:session.usuario,
            rol:session.rol
          })
      }else{
        throw new NotFoundException('no existe registros')
      }

    }else{
      return res.redirect('/bioapp/home')
    }

  }

  @Get('vistaFinalizar/:id')
  async vistaFinalizarCompra(@Res() res, @Param() parametrosRuta,@Session() session){

    const estaLogeado = session.usuario
    if(estaLogeado){
      const idFact = Number(parametrosRuta.id)
      let respuesta
      try {
        respuesta = await this._facturaService.mostrarFinalizarFactura(idFact)
      }catch (e) {
        const mensaje = 'Error del servidor'
        return res.redirect('/bioapp/facturas?mensaje='+mensaje)
      }
      if(respuesta){
        return res.render('factura/finalizarCompra',{
          detallesFactura:respuesta,
          usuario:session.usuario,
          rol:session.rol
        })
      }else{
        const mensaje = 'Error del servidor'
        return res.redirect('/bioapp/facturas?mensaje='+mensaje)
      }
    }else{
      return res.redirect('/bioapp/home')
    }


  }


  @Get('vistaEditar/factura/:id')
  async editarCompra(@Res() res,@Param() parametrosRuta,@Session() session){
    const estaLogeado = session.usuario

    if(estaLogeado){
      const id = Number(parametrosRuta.id)
      let respuesta
      try {
        respuesta = await this._facturaService.mostrarFacturaDetalles(id)
      }catch (e) {
        const mensaje = 'Error del servidor'
        return res.redirect('/bioapp/facturas?mensaje='+mensaje)
      }
      if(respuesta){

        if(respuesta.detalles.length == 0){

          return res.redirect('/bioapp/facturas')

        }else{
          console.log('editar factura',respuesta);
          return res.render('factura/editarFactura.ejs',
            {
              factura:respuesta,
              usuario:session.usuario,
              rol:session.rol
            })
        }

      }else{
        const mensaje = 'Error del servidor'
        return res.redirect('/bioapp/facturas?mensaje='+mensaje)
      }
    }else{
      return res.redirect('/bioapp/home')
    }



  }

  @Post('eliminar/factura/:id')
  async eliminarFactura(@Param() parametrosRuta, @Res() res){
    const id = Number(parametrosRuta.id)
    try {
      await this._facturaService.eliminarFactura(id)
      const mensaje = 'Factura eliminada'
      return res.redirect('/bioapp/facturas?mensaje='+mensaje)
    }catch (e) {
        const  mensaje = 'Error del servidor'
      return res.redirect('/bioapp/facturas?mensaje='+mensaje)
    }
  }

  @Post('finalizar/factura/:id')
  async finalizarCompra(@Param() parametrosRuta, @Body() parametrosCuerpo,@Res() res){
    let tarjeta
    try {
      tarjeta = await this._tarjetaCreditoService.buscarTarjetaPorNumero(parametrosCuerpo.tarjeta)
    }catch (e) {
      return res.redirect('/bioapp/facturas?mensaje=Error del Servidor')
    }

    const fecha = new Date
    const factura:any = {
      id:Number(parametrosRuta.id),
      tipo:'factura',
      fechaHora:fecha,
      tarjeta_credito:(tarjeta.id),
    }

    try {
      await this._facturaService.editarFactura(factura)
      return res.redirect('/bioapp/facturas?compra=Compra Finalizada')
    }catch (e) {
      return res.redirect('/bioapp/facturas?mensaje=Error del Servidor')
    }

  }



}