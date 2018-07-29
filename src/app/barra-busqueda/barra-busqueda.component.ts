import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Libro} from '../entidades/libro';
import {LibroService} from '../service/libro.service';
declare var $;



@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent implements OnInit, AfterViewInit {
  libros: Libro[];
  textoABuscar = '';
  filtro = 'Libro';

  constructor(private _libroService: LibroService) {}

  ngOnInit() {
    const libros$ = this._libroService.obtenerTodos();
    libros$.subscribe(
      value => {
        this.libros = value;
      },
      error1 => {
        console.log(error1); }
    );
  }
  ngAfterViewInit(): void {}
  onClickMe() {}

  onKey(event: any) {
    if (this.filtro === 'Libro') {
      this.obtenerLibros(event.target.value);
      if (this.libros.length !== 0) {
       document.getElementById('dropDownSearchContent').classList.add('show');
      }
    } else {
    }
    this.textoABuscar = event.target.value;
  }
  obtenerLibros(nombre: string) {
    const libros$ = this._libroService.obtenerLike(nombre);
    libros$.subscribe(
      value => {
        this.libros = value;
      },
      error1 => { console.log(error1); }
    );
  }

  fillSearchBar(evento, nombreLibro: string) {
    evento.preventDefault();
    this.textoABuscar = nombreLibro;
    this.libros = [];
    document.getElementById('dropDownSearchContent').classList.remove('show');
  }
  changeNameOfDropDownFilter(filtro: string) {
    this.filtro = filtro;
    document.getElementById('dropDownSearchContent').classList.remove('show');
  }



}
