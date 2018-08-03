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
    this.textoBotonAgregarCarrito = 'Agregar al carrito: ' + '$' + this.libro.precio;
  }
  emitirLibro() {
    this.libroEmit.emit(this.libro);
  }
  agregarAlCarrito(libro: Libro) {
    if (this.estaAgregado === false) {
      this.textoBotonAgregarCarrito = 'Ir al carrito';
      this._carritoComprasService.agregarDetalle(new DetallePedido(1, libro));
      this.estaAgregado = true;
    } else {
      this.textoBotonAgregarCarrito = 'Agregar al carrito: $' + libro.precio;
      this.estaAgregado = false;
      this.irACarrito();
    }
  }
  irACarrito() {
    this._router.navigate(['/carrito']);
  }
}
