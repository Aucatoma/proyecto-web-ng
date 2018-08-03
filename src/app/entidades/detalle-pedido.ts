import {Libro} from './libro';

export class DetallePedido {
  cantidad: number;
  libro: Libro;
  constructor (cantidad: number, libro: Libro) {
    this.cantidad = cantidad;
    this.libro = libro;
  }
}
