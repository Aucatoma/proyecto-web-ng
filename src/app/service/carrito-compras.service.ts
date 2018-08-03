import { Injectable } from '@angular/core';
import {Libro} from '../entidades/libro';
import {DetallePedidoComponent} from '../detalle-pedido/detalle-pedido.component';
import {DetallePedido} from '../entidades/detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  detalles: DetallePedido[] = [];
  constructor() { }
  agregarDetalle(detalle: DetallePedido) {
    this.detalles.splice(this.detalles.length, 0, detalle);
    localStorage.setItem('detalles', JSON.stringify(this.detalles));
  }
  quitarDetalle(detalle) {
    this.detalles.splice(this.detalles.findIndex(i => i === detalle), 1);
    localStorage.setItem('detalles', JSON.stringify(this.detalles));
  }
}
