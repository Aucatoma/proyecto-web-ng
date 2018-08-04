import {AfterViewInit, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Libro} from '../entidades/libro';
import {LibroService} from '../service/libro.service';
import {CarritoComprasService} from '../service/carrito-compras.service';
import {Router} from '@angular/router';
import {DetallePedido} from '../entidades/detalle-pedido';


@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit {
  @Input() libro: Libro;
  @Output() libroEmit = new EventEmitter<Libro>();
  @HostBinding('attr.class') clase = 'col-sm-3';
  textoBotonAgregarCarrito = '';
  estaAgregado = false;

  constructor(private _router: Router,
              private _libroService: LibroService,
              private _carritoComprasService: CarritoComprasService) { }

  ngOnInit() {
    this.textoBotonAgregarCarrito = 'Añadir al carrito: $' + this.libro.precio;
  }
  emitirLibro() {
    this.libroEmit.emit(this.libro);
  }
  agregarAlCarrito(libro: Libro) {
    this.estaAgregado = this._carritoComprasService.agregarDetalle(new DetallePedido(1, libro));
    if (this.estaAgregado === true) {
      this.textoBotonAgregarCarrito = 'Ir al carrito';
    } else {
      this.irACarrito();
    }
  }
  irACarrito() {
    this.textoBotonAgregarCarrito = 'Ir al carrito';
    this._router.navigate(['/carrito']);
  }
}
