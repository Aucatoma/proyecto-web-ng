import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comentario} from '../entidades/comentario';
import {ComentarioService} from '../service/comentario.service';
import {Libro} from '../entidades/libro';
import {Usuario} from '../entidades/usuario';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  @Input() comentarios: Comentario[];
  @Input() libro: Libro;
  @Input() usuario: Usuario;
  @Output() textoComentarioEmit = new EventEmitter<string>();
  textoComentario = '';
  constructor(private _comentarioService: ComentarioService) { }

  ngOnInit() { }

  comentar(form) {
     this.textoComentario = form.controls.textoComentario.value;
     this.emitirComentario();
  }
  emitirComentario() {
    this.textoComentarioEmit.emit(this.textoComentario);
  }


}
