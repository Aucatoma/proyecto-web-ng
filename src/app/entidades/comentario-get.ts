import {UsuarioComentario} from './usuario-comentario';

export class ComentarioGet {
  id: number;
  fecha: string;
  comentario: string;
  puntuacionLibro: number;
  libro: number;
  usuario: UsuarioComentario;
  constructor() {
    this.fecha = '';
    this.comentario = '';
    this.puntuacionLibro = 0;
    this.libro = 0;
    this.usuario = new UsuarioComentario();
  }
}


