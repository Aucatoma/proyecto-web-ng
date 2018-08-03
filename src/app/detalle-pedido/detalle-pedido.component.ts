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
  detallesRecibidos: DetallePedido[] = [];
  precioTotal = 0;
  cantidadTotal = 0;
  constructor(private _carritoComprasService: CarritoComprasService) { }

  ngOnInit() {
    this.detallesRecibidos = this._carritoComprasService.detalles;
  }
  ngAfterViewInit(): void {
  }
  calcularPrecioTotal(cantidad, libro, indice) {
    this.detallesRecibidos[indice].precioTotalPorDetalle = cantidad.value * libro.precio;
    document.getElementById(indice).innerText = '$' + this.detallesRecibidos[indice].precioTotalPorDetalle + '';
    this.detallesRecibidos[indice].cantidad = cantidad.value;
    this.calcularCantidadYPrecioTotal();
    this.emitirCantidadTotalYPrecioTotal();
  }
  quitarDelCarrito(detalle: DetallePedido, libro: Libro) {
    this._carritoComprasService.quitarDetalle(detalle);
    console.log('SE ELEMINO: ' + libro.id);
    this.calcularCantidadYPrecioTotal();
    this.emitirCantidadTotalYPrecioTotal();
  }
  emitirCantidadTotalYPrecioTotal() {
    // console.log('llegue');
    this.cantidadTotalEmit.emit(this.cantidadTotal);
    this.precioTotalEmit.emit(this.precioTotal);
  }
  calcularCantidadYPrecioTotal() {
    this.cantidadTotal = 0;
    this.precioTotal = 0;
    for (const detallePedido of this.detallesRecibidos) {
      this.cantidadTotal = this.cantidadTotal + detallePedido.cantidad * 1;
      this.precioTotal = this.precioTotal + detallePedido.precioTotalPorDetalle * 1;
    }
    console.log('CANTIDAD TOTAL AL MOMENTO: ' + this.cantidadTotal);
    console.log('PRECIO TOTAL AL MOMENTO: ' + this.precioTotal);
  }
}
