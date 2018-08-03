import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarritoComprasService} from '../service/carrito-compras.service';
import {Libro} from '../entidades/libro';
import {DetallePedido} from '../entidades/detalle-pedido';
declare var $: any;

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit, AfterViewInit {

  @Output() cantidadEmit = new EventEmitter<number>();
  librosRecibidos: Libro[] = [];
  precioTotal = 0;
  cantidadTotal = 0;
  detallesPedido: DetallePedido[];
  constructor(private _carritoComprasService: CarritoComprasService) { }

  ngOnInit() {
    this.librosRecibidos = this._carritoComprasService.libros;
    this.detallesPedido = [];
    this.precioTotal = 0;
  }
  ngAfterViewInit(): void {
    for (const libro of this.librosRecibidos) {
      // console.log(libro.nombre);
      this.detallesPedido.splice(this.detallesPedido.length, 0, new DetallePedido(0, libro));
      console.log(new DetallePedido(0, libro));
    }
  }
  calcularPrecioTotal(cantidad, libro: Libro, indice) {
    this.precioTotal = cantidad.value * libro.precio;
    document.getElementById(indice).innerText = '$' + this.precioTotal + '';
    this.detallesPedido[indice].cantidad = cantidad.value;
    this.calcularCantidadTotalDetalle();
    this.emitirCantidad();
  }
  quitarDelCarrito(libro: Libro) {
    this._carritoComprasService.quitarLibro(libro);
  }
  emitirCantidad() {
    this.cantidadEmit.emit(this.cantidadTotal);
  }
  calcularCantidadTotalDetalle() {
    this.cantidadTotal = 0;
    for (const detallePedido of this.detallesPedido) {
      this.cantidadTotal = this.cantidadTotal + detallePedido.cantidad * 1;
    }
    console.log('ESTA ES LA CANTIDAD TOTAL AL MOMENTO: ' + this.cantidadTotal);
  }
}
