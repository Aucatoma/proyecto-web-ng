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

  @Output() cantidadTotalEmit = new EventEmitter<number>();
  @Output() precioTotalEmit = new EventEmitter<number>();
  librosRecibidos: Libro[] = [];
  precioTotalPorDetalle = 0;
  precioTotal = 0;
  cantidadTotal = 0;
  detallesPedido: DetallePedido[];
  constructor(private _carritoComprasService: CarritoComprasService) { }

  ngOnInit() {
    this.librosRecibidos = this._carritoComprasService.libros;
    this.detallesPedido = [];
    this.precioTotalPorDetalle = 0;
  }
  ngAfterViewInit(): void {
    for (const libro of this.librosRecibidos) {
      this.detallesPedido.splice(this.detallesPedido.length, 0, new DetallePedido(0, libro));
    }
  }
  calcularPrecioTotal(cantidad, libro: Libro, indice) {
    this.precioTotalPorDetalle = cantidad.value * libro.precio;
    document.getElementById(indice).innerText = '$' + this.precioTotalPorDetalle + '';
    this.detallesPedido[indice].cantidad = cantidad.value;
    this.detallesPedido[indice].precioTotalPorDetalle = this.precioTotalPorDetalle;
    this.calcularCantidadYPrecioTotal();
    this.emitirCantidadTotal();
    this.emitirPrecioTotal();
  }
  quitarDelCarrito(libro: Libro) {
    this._carritoComprasService.quitarLibro(libro);
    this.calcularCantidadYPrecioTotal();
  }
  emitirCantidadTotal() {
    // console.log('llegue');
    this.cantidadTotalEmit.emit(this.cantidadTotal);
  }
  private emitirPrecioTotal() {
    this.precioTotalEmit.emit(this.precioTotal);
  }
  calcularCantidadYPrecioTotal() {
    this.cantidadTotal = 0;
    this.precioTotal = 0;
    for (const detallePedido of this.detallesPedido) {
      this.cantidadTotal = this.cantidadTotal + detallePedido.cantidad * 1;
      this.precioTotal = this.precioTotal + detallePedido.precioTotalPorDetalle * 1;
    }
  }
}
