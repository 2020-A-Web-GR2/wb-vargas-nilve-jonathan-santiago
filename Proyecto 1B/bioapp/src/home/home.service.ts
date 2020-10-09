import { Injectable } from '@nestjs/common';
import { ProductoService } from '../producto/producto.service';

@Injectable()
export class HomeService {
  constructor(private _productoService:ProductoService) {
  }

  async mostrarProductos(categoria:string){

   const  productos = await this._productoService.productosYCategoria(categoria)
    return productos
  }


}