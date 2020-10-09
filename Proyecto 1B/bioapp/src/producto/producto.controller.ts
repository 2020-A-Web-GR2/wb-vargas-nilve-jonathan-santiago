import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException, Param,
  Post,
  Put, Query, Res, Session,
} from '@nestjs/common';
import { ProductoDto } from './DTO/producto-dto';
import { ProductoService } from './producto.service';
import { CategoriaService } from '../categoria/categoria.service';
import { validate, ValidationError } from 'class-validator';
import { FacturaDto } from '../factura/DTO/factura-dto';
import { DetallesDto } from '../detalles/DTO/detalles-dto';
import { FacturaService } from '../factura/factura.service';
import { DetallesService } from '../detalles/detalles.service';
import { FacturaEntity } from '../factura/factura.entity';
import { type } from 'os';
import { ProductoEntity } from './producto.entity';

@Controller('bioapp')
export class ProductoController {

  constructor(
    private readonly _productoService: ProductoService,
    private readonly _categoriaService:CategoriaService,
    private readonly _facturaService: FacturaService,
    private readonly _detallesService:DetallesService
  ) {}


  @Get('productos')
  async vistaPoductos(@Res() res,@Query() parametrosConsulta){
    let respuesta
    try {
      respuesta =  await this._productoService.productos()
    }catch (e) {
      return res.redirect('/bioapp/home')
    }

    if(respuesta){
      return res.render('productoPorCategoria/productos',{
        arregloProductos:respuesta,
        mensaje:parametrosConsulta.mensaje
      })
    }else{
      return res.redirect('/bioapp/home')
    }

  }

  @Get('vista/agregar/producto')
  async vistaProductos(@Res() res,@Query() parametrosConsulta,@Session() session){
    const usuario = session.usuario
    if(usuario){
      let respuesta
      try {
        respuesta = await this._categoriaService.mostrarTodos()
      }catch (e) {
        throw new InternalServerErrorException('Error del servidor')
      }
      return res.render('productoPorCategoria/agregarProductos',{
        categoria:respuesta,
        mensaje:parametrosConsulta.mensaje,
        nombre:parametrosConsulta.nombre,
        descripcion:parametrosConsulta.descripcion,
        precio:parametrosConsulta.precio,
        imagen:parametrosConsulta.imagen,
        usuario:session.usuario,
        rol:session.rol
      })
    }else{
      return res.redirect('/bioapp/home')
    }
  }

  @Post('agregar/producto')
  async crearProducto(@Body() parametrosCuerpo,@Res() res){

    const  productoValido = new ProductoDto()
    productoValido.nombre = parametrosCuerpo.nombre
    productoValido.imagen = parametrosCuerpo.imagen
    productoValido.descripcion = parametrosCuerpo.descripcion
    productoValido.precio = Number(parametrosCuerpo.precio)

    let errores:ValidationError[]
    let propiedad = []
    const datos = `&nombre=${parametrosCuerpo.nombre}&imagen=${parametrosCuerpo.imagen}&descripcion=${parametrosCuerpo.descripcion}&precio=${parametrosCuerpo.precio}`


    try {
      errores = await validate(productoValido)
    }catch (e) {
      return res.redirect('/bioapp/vista/agregar/producto?mensaje=Error validando datos'+ datos)
    }
    if(errores.length >0){
      errores.forEach((error)=>{
        propiedad.push(error.property)
      })
      return res.redirect('/bioapp/vista/agregar/producto?mensaje='+propiedad + datos)

    }else{
      await this._productoService.crearProducto(parametrosCuerpo)
      return res.redirect('/bioapp/home')
    }

  }

  @Get('buscar/producto')
  async mostrarProductos(@Query() parametrosConsulta,@Res() res,@Session() session){
    const estaLogeado = session.usuario

    if(parametrosConsulta.query.length > 0){
      let respuesta
      try {
        respuesta = await this._productoService.mostrarTodos(parametrosConsulta.query)
      }catch (e) {
        throw new InternalServerErrorException({
          mensaje:"Error del servidor",
        })
      }
      if( respuesta){
        if(estaLogeado){
          return res.render('buscar/buscar-producto',{
            productosEncontrados:respuesta,
            query:parametrosConsulta.query,
            usuario:session.usuario,
            rol:session.rol
          })
        }else{
          return res.render('buscar/buscar-producto',{
            productosEncontrados:respuesta,
            query:parametrosConsulta.query
          })
        }
      }else{
        throw new InternalServerErrorException({
          mensaje:"No existe registros",
        })
      }
    }else{
      return res.redirect('/bioapp/home')
    }
  }


  @Get('/vista/editar/producto/:id')
  async vistaEditarProducto(@Param() parametrosRuta,@Res() res,
                            @Query() parametrosConsulta,@Session() session){
    const id = Number(parametrosRuta.id)
    const usuario = session.usuario

    if(usuario){
      let respuesta;
      let categoria;
      try {
        respuesta = await this._productoService.mostrarUno(id)
        categoria = await this._categoriaService.mostrarTodos()
      }catch (e) {
        return res.redirect('/bioapp/productos?mensaje= Error al buscar producto')
      }
      if(respuesta){
        return res.render('productoPorCategoria/agregarProductos',{
          producto:respuesta,
          mensaje:parametrosConsulta.mensaje,
          categoria:categoria,
          usuario:session.usuario,
          rol:session.rol
        })
      }else{
        return res.redirect('/bioapp/productos?mensaje= Error del servidor')
      }
    }else{
      return res.redirect('/bioapp/home')
    }



  }

  @Post('editar/producto/:id')

  async editarProducto(@Param() parametrosRuta, @Body() parametrosCuerpo,@Res() res){
    let errores:ValidationError[]
    const id = Number(parametrosRuta.id)
    const  productoValido = new ProductoDto()
    productoValido.nombre = parametrosCuerpo.nombre
    productoValido.imagen = parametrosCuerpo.imagen
    productoValido.descripcion = parametrosCuerpo.descripcion
    productoValido.precio = Number(parametrosCuerpo.precio)
    try {

     errores = await validate(productoValido)

    }catch (e) {
      return res.redirect(`/bioapp/vista/editar/producto/${id}?mensaje=Error validando datos`)
    }

    if(errores.length >0){
      let propiedad = []

      errores.forEach((error)=>{
        propiedad.push(error.property)
      })
      return res.redirect(`/bioapp/vista/editar/producto/${id}?mensaje=`+propiedad)

    }else{
      parametrosCuerpo.id = id
      await this._productoService.editarProducto(parametrosCuerpo)
      return res.redirect('/bioapp/productos')
    }

  }

  @Get(':termino/producto/:id')
  async mostrarProducto(@Param() parametrosRuta,@Res() res,@Query() parametrosConsulta,@Session() session){
    const estaLogeado = session.usuario
    try {
      const id = Number(parametrosRuta.id)

      const respuesta = await this._productoService.mostrarUno(id)

      if(estaLogeado){
        return res.render('productoPorCategoria/detallesProducto',
          {
            producto:respuesta,
            termino:parametrosRuta.termino,
            mensaje:parametrosConsulta.mensaje,
            usuario:session.usuario,
            rol:session.rol
          })
      }else{
        return res.render('productoPorCategoria/detallesProducto',
          {
            producto:respuesta,
            termino:parametrosRuta.termino,
            mensaje:parametrosConsulta.mensaje
          })
      }


    }catch (e) {
      console.log(e);
    }
  }



  @Post('eliminar/producto/:id')
  async eliminarProducto(@Param() parametrosRuta,@Res() res){
    const id = Number(parametrosRuta.id)
    let respuesta
    try {
      respuesta = await this._productoService.eliminarProducto(id)
    }catch (e) {
      return res.redirect('/bioapp/productos?mensaje=No se pudo eliminar')
    }
    if(respuesta){
      return res.redirect('/bioapp/productos?mensaje=Producto eliminado')
    }else{
      return res.redirect('/bioapp/productos?mensaje=No se pudo eliminar')
    }

  }

  @Post(':termino/agregar/acarrito/:id')
  async anadirProducto(@Param() parametrosRuta, @Body() parametrosCuerpo,@Res() res,@Session() session){

    const estaLogeado = session.usuario
    const termino = parametrosRuta.termino
    const idProducto = Number(parametrosRuta.id)

    const facturaValida = new FacturaDto()
    const detalleValido = new DetallesDto()
    const fecha = new Date()
    let erroresDetalles:ValidationError[]
    let erroresFactura:ValidationError[]
    let factura:any
    let detalles:any = {}

    if(estaLogeado){
      const tipoCarrito = await this._facturaService.mostrarFactura('carrito',Number(session.usuario))

      try {
        const producto = await this._productoService.mostrarUno(idProducto)
        const cantidad = Number(parametrosCuerpo.cantidad)
        const precioTotal = cantidad*Number(producto.precio)

        detalleValido.descripcion = producto.nombre
        detalleValido.cantidad = cantidad
        detalleValido.precioUnitario = Number(producto.precio)
        detalleValido.precioTotal = precioTotal

        facturaValida.fecha = fecha
        facturaValida.tipo = 'carrito'

        factura = {
          fechaHora:fecha,
          precioTotal:0,
          precioTotalConIVA:0,
          tipo:'carrito',
          tarjetaCredito:null,
          usuario:Number(session.usuario)
        }

        detalles = {
          descripcion:producto.nombre,
          cantidad:cantidad,
          precioUnitario:Number(producto.precio),
          precioTotal:precioTotal,
          producto:idProducto
        }
        console.log(factura);
        console.log(detalles);

        erroresDetalles = await  validate(detalleValido)
        erroresFactura = await validate(facturaValida)
      }catch (e) {
        console.log(e);
        return res.redirect(`/bioapp/${termino}/producto/${idProducto}`)
      }

      if(erroresFactura.length > 0 || erroresDetalles.length > 0 ){

        return res.redirect(`/bioapp/${termino}/producto/${idProducto}?mensaje=Error en los datos`)

      }else{
        try {

          if(tipoCarrito){
            detalles.factura = tipoCarrito.id
          }else{
            const respuestaFactura = await this._facturaService.crearFactura(factura)
            const facturaId = respuestaFactura.id
            detalles.factura = facturaId
          }
          await this._detallesService.crearDetalle(detalles)
          return res.redirect(`/bioapp/${termino}/producto/${idProducto}?mensaje=Producto agregado`)

        }catch (e) {
          return res.redirect(`/bioapp/${termino}/producto/${idProducto}?mensaje=Error del servidor`)
        }
      }

    }else{
      return res.redirect(`/bioapp/${termino}/producto/${idProducto}?mensaje=Registrate o Ingresa a BioApp`)
    }

  }

  @Get('productos/encontrados')
  async buscarProductos(@Res() res, @Query()parametrosConsulta,@Session() session){
    const usuario = session.usuario

    if(usuario){
      let respuesta
      try {
        respuesta =  await this._productoService.productos(parametrosConsulta.query)
      }catch (e) {
        return res.redirect('/bioapp/home')
      }

      if(respuesta){
        return res.render('productoPorCategoria/productos',{
          arregloProductos:respuesta,
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



}