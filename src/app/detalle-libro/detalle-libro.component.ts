import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {Libro} from '../entidades/libro';
import {Editorial} from '../entidades/editorial';
import {Genero} from '../entidades/genero';
import {Autor} from '../entidades/autor';
import {ComentarioService} from '../service/comentario.service';
import {delay} from 'q';
import {CredencialesService} from '../credenciales/credenciales.service';
import {ErrorHandlerService} from '../service/error-handler.service';
import {Comentario} from '../entidades/comentario';
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
  @Input() comentarios: Comentario[];
  @HostBinding('attr.class') clase = 'row';
  puntuacionUsuario = 0;
  comentarioUsuario = '';
  nuevoComentario = new Comentario();
  contador = 0;
  error = undefined;

  constructor(
    private _comentarioService: ComentarioService,
    private _errorHandlerService: ErrorHandlerService,
    private _credencialesService: CredencialesService) {}

  ngOnInit() {

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
      this.nuevoComentario.username = this._credencialesService.credenciales.usuario.nombre;
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
      this.comentarios.push(this.nuevoComentario);
      console.log('Comentario insertado');
      console.log(value);
      this.error = undefined;
    }, error1 => { console.log(error1); });
  }


}
