import {Component, Input, OnInit} from '@angular/core';
import {CarritoComprasService} from '../service/carrito-compras.service';
import {Libro} from '../entidades/libro';
declare var $: any;

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit {

  librosRecibidos: Libro[] = [];
  precioTotal = 0;
  constructor(private _carritoComprasService: CarritoComprasService) { }

  ngOnInit() {
    this.librosRecibidos = this._carritoComprasService.libros;
    this.precioTotal = 0;
  }
  calcularPrecioTotal(cantidad, libro: Libro, indice) {
    this.precioTotal = cantidad.value * libro.precio;
    document.getElementById(indice).innerText = '$' + this.precioTotal + '';
  }
  quitarDelCarrito(libro: Libro) {
    this._carritoComprasService.quitarLibro(libro);
  }

}
