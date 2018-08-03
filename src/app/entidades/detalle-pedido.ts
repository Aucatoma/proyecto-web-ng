import {Libro} from './libro';

export class DetallePedido {
  cantidad: number;
  libro: Libro;
  precioTotalPorDetalle: number;
  constructor (cantidad: number, libro: Libro) {
    this.cantidad = cantidad;
    this.libro = libro;
    this.precioTotalPorDetalle = 0;
  }
}
