import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Libro} from '../entidades/libro';
import {LibroService} from '../service/libro.service';


@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.css']
})
export class CardBookComponent implements OnInit {
  libros: Libro[];

  constructor(private _libroService: LibroService) { }

  ngOnInit() {
    this.searchOneBook();
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
