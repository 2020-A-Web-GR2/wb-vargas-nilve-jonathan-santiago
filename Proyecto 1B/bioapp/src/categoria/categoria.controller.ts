import {
  Body,
  Controller, Delete,
  Get,
  InternalServerErrorException, NotFoundException,
  Param,
  Post,
  Put, Query, Res, Session,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaDto } from './DTO/categoria-dto';
import { validate, ValidationError } from 'class-validator';


//http://localhost:3000/bioapp/
@Controller('bioapp')
export class CategoriaController {

  constructor(private _categoriaService:CategoriaService) {
  }

  // @Post('categoria')
  // async crearCategoria(@Body() parametrosCuerpo) {
  //
  //   const categoriaValida = new CategoriaDto()
  //   categoriaValida.nombre = parametrosCuerpo.nombre
  //   categoriaValida.descripcion = parametrosCuerpo.descripcion
  //
  //   try {
  //     const errores: ValidationError[] = await validate(categoriaValida)
  //     if(errores.length>0){
  //       return errores
  //     }else{
  //       const respuesta = await this._categoriaService.crearCategoria(parametrosCuerpo)
  //       return respuesta
  //     }
  //
  //   } catch (e) {
  //     throw new InternalServerErrorException({
  //       mensaje:"Error del servidor"
  //       }
  //     )
  //   }
  // }
  //
  // @Put('productoPorCategoria/:id')
  // async editarCategoria(@Param() parametrosRuta, @Body() parametrosCuerpo){
  //   const categoriaEditada = new CategoriaDto()
  //
  //   categoriaEditada.nombre = parametrosCuerpo.nombre
  //   categoriaEditada.descripcion = parametrosCuerpo.descripcion
  //   const id = Number(parametrosRuta.id)
  //
  //   try {
  //     const errores:ValidationError[] = await validate(categoriaEditada)
  //     if(errores.length>0){
  //       return errores
  //     }else{
  //       parametrosCuerpo.id = id
  //       const respuesta = await this._categoriaService.editarCategoria(parametrosCuerpo)
  //       return respuesta
  //     }
  //
  //   }catch (e) {
  //     throw new InternalServerErrorException({
  //         mensaje:"Error del servidor"
  //       }
  //     )
  //   }
  //
  // }


  // @Get('productoPorCategoria/:nombre')
  // async mostrarUno(@Param() parametrosRuta){
  //   let respuesta
  //   const nombre = parametrosRuta.nombre
  //   try {
  //     respuesta = await this._categoriaService.mostrarUno(nombre)
  //   }catch (e) {
  //     throw new InternalServerErrorException({
  //         mensaje:"Error del servidor"
  //       }
  //     )
  //   }
  //   if(respuesta){
  //     return respuesta
  //   }else{
  //     throw new NotFoundException({
  //         mensaje:"No existe registros"
  //       }
  //     )
  //   }
  // }
  //
  // @Delete('productoPorCategoria/:id')
  // async eliminarCategoria(@Param() parametrosRuta){
  //   const id = Number(parametrosRuta.id)
  //   try {
  //     const respuesta = await this._categoriaService.eliminarCategoria(id)
  //     return {
  //       mensaje:"registro con id "+ id + " ha sido eliminado"
  //     }
  //   }catch (e) {
  //     throw new InternalServerErrorException({
  //       mensaje:"Error del servidor"
  //     })
  //   }
  // }


  @Get('categoria/:nombre')
  async mostrarTodas(@Param() parametrosRuta,@Res() res,@Session() session ){
    const estaLogeado = session.usuario
    let respuesta
    let nombre = parametrosRuta.nombre
    try {
      respuesta = await this._categoriaService.mostrarProductosPorCategoria(nombre)
    }catch (e) {
      // throw new InternalServerErrorException({
      //   mensaje:'Error del servidor'
      // })
      console.log(e);
    }
    if(respuesta){

      if(estaLogeado){
        return res.render('productoPorCategoria/productoCategoria.ejs',
          {
            arregloProductos:respuesta,
            categoria:nombre,
            usuario:session.usuario,
            rol:session.rol
          })
      }else{
        return res.render('productoPorCategoria/productoCategoria.ejs',
          {
            arregloProductos:respuesta,
            categoria:nombre,
          })
      }

    }else{
      console.log('no existe registros');
    }
  }

}