import { Component, OnInit } from '@angular/core';
import {Comentario} from '../entidades/comentario';
import {ComentarioService} from '../service/comentario.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  comentarios: Comentario[];

  constructor(private _comentarioService: ComentarioService) { }

  ngOnInit() {
    this.searchComentaries();
  }
  searchComentaries() {
    const comentarios$ = this._comentarioService.obtenerTodos();
    comentarios$.subscribe(
      value => {
        this.comentarios = value;
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}
