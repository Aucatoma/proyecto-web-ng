export class DetallePost {
  id: number;
  cantidad: number;
  cabecera: number;
  libro: number;
  constructor(cantidad: number, cabecera: number, libro: number) {
    this.cantidad = cantidad;
    this.cabecera = cabecera;
    this.libro = libro;
  }
}
