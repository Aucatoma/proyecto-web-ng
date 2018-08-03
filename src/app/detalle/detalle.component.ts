import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Libro} from '../entidades/libro';
import {LibroService} from '../service/libro.service';
import {Location} from '@angular/common';
import {Genero} from '../entidades/genero';
import {Autor} from '../entidades/autor';
import {Comentario} from '../entidades/comentario';
import {Editorial} from '../entidades/editorial';
import {GeneroService} from '../service/genero.service';
import {AutorService} from '../service/autor.service';
import {EditorialService} from '../service/editorial.service';
import {ComentarioService} from '../service/comentario.service';
import {stringify} from '@angular/core/src/util';
import {ComentarioGet} from '../entidades/comentario-get';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, AfterViewInit {

  libro: Libro;
  genero: Genero;
  autor: Autor;
  comentarios: ComentarioGet[];
  editorial: Editorial;
  constructor(
    private _route: ActivatedRoute,
    private _libroService: LibroService,
    private _autorService: AutorService,
    private _generoService: GeneroService,
    private _editorialService: EditorialService,
    private _comentarioService: ComentarioService,
    private location: Location
  ) { }

  ngOnInit() { this.obtenerLibro(); }
  ngAfterViewInit(): void { }

  obtenerLibro() {
    const id = +this._route.snapshot.paramMap.get('id');
    const libro$ = this._libroService.obtenerUno(id + '');
    libro$.subscribe(value => {
      this.libro = value;
      console.log(this.libro);
      this.obtenerAutor(this.libro.id + '');
      this.obtenerEditorial(this.libro.id + '');
      this.obtenerGenero(this.libro.id + '');
      this.obtenerUsuarioComentario(this.libro.id + '');
    }, error1 => console.log(error1));
  }
  obtenerAutor(id: string) {
    const autor$ = this._autorService.obtenerPorLibroId(id);
    autor$.subscribe(value => {
      this.autor = value;
      console.log(this.autor);
    }, error1 => console.log(error1));
  }
  obtenerGenero(id: string) {
    const genero$ = this._generoService.obtenerPorLibroId(id);
    genero$.subscribe(value => {
      this.genero = value;
      console.log(this.genero);
    }, error1 => console.log(error1));
  }
  obtenerEditorial(id: string) {
    const editorial$ = this._editorialService.obtenerPorLibroId(id);
    editorial$.subscribe(value => {
      this.editorial = value;
      console.log(this.editorial);
    }, error1 => console.log(error1));
  }

  obtenerUsuarioComentario(id: string) {
    const comentario$ = this._comentarioService.obtenerUsuarioComentario(id);
    comentario$.subscribe(value => {
      this.comentarios = value;
      console.log(this.comentarios);
    }, error1 => { console.log(error1); });
  }
}

