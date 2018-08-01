export class Comentario {
  id: number;
  fecha: string;
  comentario: string;
  puntuacionLibro: number;
  libro: number;
  usuario: number;
  constructor() {
    this.fecha = '';
    this.comentario = '';
    this.puntuacionLibro = 0;
    this.libro = 0;
    this.usuario = 0;
  }
}


