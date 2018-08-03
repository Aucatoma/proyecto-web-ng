export class CabeceraPedidoPost {
  id: number;
  numero: string;
  fecha: string;
  iva: number;
  usuarioTarjeta: number;
  constructor() {
    this.numero = '';
    this.fecha = '';
    this.iva = 0;
    this.usuarioTarjeta = 0;
  }
}
