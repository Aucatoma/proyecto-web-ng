import {AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {Libro} from '../entidades/libro';
import {Editorial} from '../entidades/editorial';
import {Genero} from '../entidades/genero';
import {Autor} from '../entidades/autor';
import {ComentarioService} from '../service/comentario.service';
import {delay} from 'q';
import {CredencialesService} from '../credenciales/credenciales.service';
import {ErrorHandlerService} from '../service/error-handler.service';
import {Comentario} from '../entidades/comentario';
import {ComentarioGet} from '../entidades/comentario-get';
import {CarritoComprasService} from '../service/carrito-compras.service';
import {Router} from '@angular/router';
declare var $;
@Component({
  selector: 'app-detalle-libro',
  templateUrl: './detalle-libro.component.html',
  styleUrls: ['./detalle-libro.component.css']
})
export class DetalleLibroComponent implements OnInit {

  @Input() libro: Libro;
  @Input() editorial: Editorial;
  @Input() genero: Genero;
  @Input() autor: Autor;
  @Input() comentarios: ComentarioGet[];
  @HostBinding('attr.class') clase = 'row';
  puntuacionUsuario = 0;
  comentarioUsuario = '';
  textoBotonAgregarCarrito = '';
  estaAgregado = false;
  nuevoComentario = new Comentario();
  comentarioInsertado = new ComentarioGet();
  contador = 0;
  error = undefined;

  constructor(
    private _router: Router,
    private _comentarioService: ComentarioService,
    private _errorHandlerService: ErrorHandlerService,
    private _credencialesService: CredencialesService,
    private _carritoComprasService: CarritoComprasService) {}

  ngOnInit() {
    this.textoBotonAgregarCarrito = 'Agregar al carrito: ' + '$' + this.libro.precio;
  }
  guardarPuntuacionEmitida(puntuacionUsuario) {
    this.puntuacionUsuario = puntuacionUsuario;
  }
  async guardarComentarioEmitido(comentarioUsuario) {
    // Se comprueba si esta loggeado
    if (this._credencialesService.credenciales !== undefined) {
      this.contador ++;
      this.comentarioUsuario = comentarioUsuario;
      this.nuevoComentario.comentario = this.comentarioUsuario;
      this.nuevoComentario.puntuacionLibro = this.puntuacionUsuario;
      this.nuevoComentario.fecha = new Date().toLocaleString();
      this.nuevoComentario.libro = this.libro.id;
      this.nuevoComentario.usuario = this._credencialesService.credenciales.usuario.id;
      await delay(1000);
      if (this.contador === 2) {
        this.insertarComentario();
        this.contador = 0;
      }
    } else {
      this.error = 'Necesita iniciar sesión o registrarse para comentar esta publicación';
    }
  }
  insertarComentario () {
    const comentarioInsertado$ = this._comentarioService.insertarComentario(this.nuevoComentario);
    comentarioInsertado$.subscribe(value => {
      // Se actuliza la vista de comentario
      this.comentarioInsertado.comentario = this.nuevoComentario.comentario;
      this.comentarioInsertado.fecha = this.nuevoComentario.fecha;
      this.comentarioInsertado.puntuacionLibro = this.nuevoComentario.puntuacionLibro;
      this.comentarioInsertado.usuario.username = this._credencialesService.credenciales.usuario.username;
      this.comentarioInsertado.usuario.imagenUrl = this._credencialesService.credenciales.usuario.imagenUrl;
      this.comentarios.splice(this.comentarios.length, 0, this.comentarioInsertado);
      console.log('Comentario insertado');
      console.log(this.nuevoComentario);
      this.error = undefined;
    }, error1 => { console.log(error1); });
  }
  calcularPuntuacionLibro() {
    let total = 0;
    if (this.comentarios.length !== 0) {
      for (const comentario of this.comentarios) {
        total = comentario.puntuacionLibro + total;
      }
      this.libro.puntuacion = total;
    } else {
      return 0;
    }
  }
  agregarAlCarrito(libro: Libro) {
    if (this.estaAgregado === false) {
      this.textoBotonAgregarCarrito = 'Ir al carrito';
      this._carritoComprasService.agregarLibro(libro);
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
