import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LibroService} from '../service/libro.service';
import {Libro} from '../entidades/libro';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  libros: Libro[];

  constructor(
    private _router: Router,
    private readonly _libroService: LibroService
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
    if (evento.filtro === 'Libro' ) {
      const libros$ = this._libroService.obtenerLike(evento.texto);
      libros$.subscribe(value => {
        this.libros = value;
      }, error1 => console.log(error1));
    }
  }


}
