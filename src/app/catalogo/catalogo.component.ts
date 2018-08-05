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
    }, error1 => console.log(error1));
  }

  irADetalle(libro) {
    this._router.navigate(['/detalle', `${libro.id}`]);
  }
  buscarLibros(evento) {
    if (evento.filtro === 'Libro') {
      console.log(evento.texto);
      const libros$ = this._libroService.obtenerLike(evento.texto);
      libros$.subscribe(value => {
        this.libros = value;
      }, error1 => console.log(error1));
    }
  }
}
