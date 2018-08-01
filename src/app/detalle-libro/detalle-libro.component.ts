import {AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {Libro} from '../entidades/libro';
import {Comentario} from '../entidades/comentario';
import {Editorial} from '../entidades/editorial';
import {Genero} from '../entidades/genero';
import {Autor} from '../entidades/autor';
import {ComentarioService} from '../service/comentario.service';
import {delay} from 'q';

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


  constructor(private _comentarioService: ComentarioService) {}

  ngOnInit() {

  }
  guardarPuntuacionEmitida(puntuacionUsuario) {
    this.puntuacionUsuario = puntuacionUsuario;
  }
  async guardarComentarioEmitido(comentarioUsuario) {
    this.contador ++;
    this.comentarioUsuario = comentarioUsuario;
    this.nuevoComentario.comentario = this.comentarioUsuario;
    this.nuevoComentario.puntuacionLibro = this.puntuacionUsuario;
    this.nuevoComentario.fecha = new Date().toLocaleString();
    this.nuevoComentario.usuario = 1;
    this.nuevoComentario.libro = this.libro.id;
    await delay(1000);

    if (this.contador === 2) {
      this.insertarComentario();
      this.contador = 0;
    }
  }
  insertarComentario () {
    this._comentarioService.insertarComentario(this.nuevoComentario).subscribe(
      value => {
        console.log('COMENTARIO INSERTADO: ' + JSON.stringify(value));
      },
      error1 => {console.log('PILAS HAY UN ERROR: ' + error1); }
    );
  }


}
