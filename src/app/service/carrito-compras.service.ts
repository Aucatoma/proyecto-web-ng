import { Injectable } from '@angular/core';
import {Libro} from '../entidades/libro';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {
  libros: Libro[] = [];
  constructor() { }
  agregarLibro(libro: Libro) {
    this.libros.splice(this.libros.length, 0, libro);
    localStorage.setItem('libros', JSON.stringify(this.libros));
  }
  quitarLibro(libro) {
    this.libros.splice(this.libros.findIndex(i => i.id === libro.id), 1);
    localStorage.setItem('libros', JSON.stringify(this.libros));
  }
}
