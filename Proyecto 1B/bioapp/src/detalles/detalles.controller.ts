import { Controller, Param, Post, Res } from '@nestjs/common';
import { DetallesService } from './detalles.service';

@Controller('bioapp')
export class DetallesController {
  constructor(private readonly _detallesService:DetallesService) {
  }
  @Post('eliminar/:idFactura/detalle/:id')
  async eliminarDetalle(@Param() parametrosRuta,@Res() res){
    const id = Number(parametrosRuta.id)
    const idFact = Number(parametrosRuta.idFactura)
    try {
      await this._detallesService.eliminarDetalle(id)
      return res.redirect('/bioapp/vistaEditar/factura/'+idFact)
    }catch (e) {
      const mensaje = 'Error del servidor'
      return res.redirect('/bioapp/facturas?mensaje='+mensaje)
    }

  }
}