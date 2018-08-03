import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comentario} from '../entidades/comentario';
import {ComentarioService} from '../service/comentario.service';
import {Libro} from '../entidades/libro';
import {Usuario} from '../entidades/usuario';
import {CredencialesService} from '../credenciales/credenciales.service';
import {ComentarioGet} from '../entidades/comentario-get';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() comentarios: ComentarioGet[];
  @Input() libro: Libro;
  @Input() usuario: Usuario;
  @Input() erroAlComentar = undefined;
  @Output() textoComentarioEmit = new EventEmitter<string>();
  textoComentario = '';
  constructor() { }

  ngOnInit() { }

  comentar(form) {
     this.textoComentario = form.controls.textoComentario.value;
     this.emitirComentario();
  }
  emitirComentario() {
    this.textoComentarioEmit.emit(this.textoComentario);
  }


}
