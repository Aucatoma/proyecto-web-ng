import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LibroService} from '../service/libro.service';
import {Libro} from '../entidades/libro';
import {ComentarioService} from '../service/comentario.service';
import {Comentario} from '../entidades/comentario';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  libros: Libro[];
  puntuacion = 3;

  constructor(
    private _router: Router,
    private readonly _libroService: LibroService,
    private readonly _comentarioService: ComentarioService,
  ) {
  }

  ngOnInit() {
    const libros$ = this._libroService.obtenerTodos();
    libros$.subscribe(value => {
      this.libros = value;
      this.obtenerPuntajeLibros();
    }, error1 => console.log(error1));
  }

  irADetalle(libro) {
    this._router.navigate(['/detalle', `${libro.id}`]);
  }

  buscarLibros(evento) {
    if (evento.filtro === 'Libro') {
      const libros$ = this._libroService.obtenerLike(evento.texto);
      libros$.subscribe(value => {
        this.libros = value;
      }, error1 => console.log(error1));
    }
  }

  obtenerPuntajeLibros() {
    for (let _i = 0; _i < this.libros.length; _i++) {
      this.obtenerComentarios(this.libros[_i].id + '', this.libros[_i]);
    }
  }

  obtenerComentarios(id: string, libro: Libro) {
    const comentarios$ = this._comentarioService.obtenerPorLibroId(id);
    comentarios$.subscribe((value) => {
      libro.puntuacion = this.obtenerPuntaje(value);
    }, (error1) => {
      console.log(error1);
    });
    return this.puntuacion;
  }

  obtenerPuntaje(comentarios: Comentario[]): number {
    if (comentarios.length !== 0) {
      let total = 0;
      for (const comentario of comentarios) {
        total = comentario.puntuacionLibro + total;
      }
      console.log('MIS PUNTJAES: ' + Math.round(total / comentarios.length));
      this.puntuacion = Math.round(total / comentarios.length);
      return Math.round(total / comentarios.length);
    } else {
      this.puntuacion = 0;
      return 0;
    }
  }
}
