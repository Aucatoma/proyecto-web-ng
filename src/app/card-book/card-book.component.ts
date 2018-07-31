import {AfterViewInit, Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Libro} from '../entidades/libro';
import {LibroService} from '../service/libro.service';


@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit {
  @Input() libro: Libro;
  @Output() libroEmit = new EventEmitter<Libro>();
  @HostBinding('attr.class') clase = 'col-sm-3';
  libros: Libro[];

  constructor(private _libroService: LibroService) { }

  ngOnInit() {
    this.searchOneBook();
  }
  emitirLibro() {
    this.libroEmit.emit(this.libro);
  }
  searchOneBook() {
    const libros$ = this._libroService.obtenerTodos();
    libros$.subscribe(
      value => {
        this.libros = value;
      },
      error1 => {
        console.log(error1);
      }
    );
  }
}
