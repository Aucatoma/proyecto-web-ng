import { Injectable } from '@angular/core';
import {DetallePedido} from '../entidades/detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  detalles: DetallePedido[] = [];
  constructor() { }
  agregarDetalle(detalle: DetallePedido) {
    const index = this.detalles.findIndex(i => i.libro === detalle.libro);
    console.log(index);
    this.detalles.splice(this.detalles.length, 0, detalle);
    localStorage.setItem('detalles', JSON.stringify(this.detalles));
  }

  guardar() {
    localStorage.setItem('detalles', JSON.stringify(this.detalles));
  }
  quitarDetalle(detalle) {
    this.detalles.splice(this.detalles.findIndex(i => i === detalle), 1);
    localStorage.setItem('detalles', JSON.stringify(this.detalles));
  }
}
