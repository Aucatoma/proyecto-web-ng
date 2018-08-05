import { Injectable } from '@angular/core';
import {DetallePedido} from '../entidades/detalle-pedido';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  detalles: DetallePedido[] = [];
  constructor() { }
  agregarDetalle(detalle: DetallePedido): boolean {
    if (!this.detalles.find(x => x.libro.id === detalle.libro.id)) {
      this.detalles.splice(this.detalles.length, 0, detalle);
      localStorage.setItem('detalles', JSON.stringify(this.detalles));
      console.log('Se añadio al carrito: ');
      console.log(detalle);
      return true;
    } else {
      return false;
    }
  }

  guardar() {
    localStorage.setItem('detalles', JSON.stringify(this.detalles));
  }
  borrar(){
    localStorage.removeItem('detalles');
  }

  quitarDetalle(detalle) {
    this.detalles.splice(this.detalles.findIndex(i => i === detalle), 1);
    localStorage.setItem('detalles', JSON.stringify(this.detalles));
  }
}
