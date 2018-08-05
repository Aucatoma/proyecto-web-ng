import {AfterViewInit, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Libro} from '../entidades/libro';
import {LibroService} from '../service/libro.service';
import {CarritoComprasService} from '../service/carrito-compras.service';
import {Router} from '@angular/router';
import {DetallePedido} from '../entidades/detalle-pedido';
import {ComentarioService} from '../service/comentario.service';
import {ComentarioGet} from '../entidades/comentario-get';
declare var $: any;

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit, AfterViewInit {
  @Input() libro: Libro;
  @Output() libroEmit = new EventEmitter<Libro>();
  @HostBinding('attr.class') clase = 'col-sm-3';
  textoBotonAgregarCarrito = '';
  estaAgregado = false;
  puntuacionLibro = 0;
  comentarios: ComentarioGet[] = [];

  constructor(private _router: Router,
              private _libroService: LibroService,
              private _carritoComprasService: CarritoComprasService,
              private _comentariosService: ComentarioService) { }

  ngOnInit() {
    this.textoBotonAgregarCarrito = 'Añadir al carrito: $' + this.libro.precio;
    this.calcularPuntuacionLibro();
  }
  ngAfterViewInit(): void {
  }
  emitirLibro() {
    this.libroEmit.emit(this.libro);
  }
  agregarAlCarrito(libro: Libro) {
    this.estaAgregado = this._carritoComprasService.agregarDetalle(new DetallePedido(1, libro));
    if (this.estaAgregado === true) {
      this.textoBotonAgregarCarrito = 'Ir al carrito de compras';
    } else {
      this.irACarrito();
    }
  }
  irACarrito() {
    this.textoBotonAgregarCarrito = 'Ir al carrito';
    this._router.navigate(['/carrito']);
  }
  calcularPuntuacionLibro() {
    const $comentarios = this._comentariosService.obtenerUsuarioComentario(this.libro.id + '');
    $comentarios.subscribe(
      value => {
        this.comentarios = value;
        this.calcularPuntuacionComentarios();
      },
        error1 => {console.log(error1); });
  }
  calcularPuntuacionComentarios() {
    let total = 0;
    if (this.comentarios.length !== 0) {
      for (const comentario of this.comentarios) {
        total = total + comentario.puntuacionLibro;
      }
      this.puntuacionLibro = Math.round(total / this.comentarios.length);
    } else {
      this.puntuacionLibro = 0;
    }
    console.log(this.puntuacionLibro);
    $('.ui.rating').rating({
      maxRating: 5,
    });
    $('.ui.rating').rating('disable');
  }
}
