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
    this.obtenerLibros(event.target.value);
    this.textoABuscar = event.target.value;
  }
  obtenerLibros(nombre: string) {
    const libros$ = this._libroService.obtenerLike(nombre);
    libros$.subscribe(
      value => {
        this.libros = value;
      },
      error1 => {
        console.log(error1); }
    );
  }

  fillSearchBar(evento, nombreLibro: string) {
    evento.preventDefault();
    this.textoABuscar = nombreLibro;
    this.libros = [];
  }

  showDropDown() {
    if (this.textoABuscar !== '') {
      this.obtenerLibros(this.textoABuscar);
    } else {
      document.getElementById('dropDownSearchContent').classList.toggle('show');
    }
  }
  changeNameOfDropDownFilter(filtro: string) {
    this.filtro = filtro;
    console.log('El filtro escogido es: ' + filtro);
  }



}
