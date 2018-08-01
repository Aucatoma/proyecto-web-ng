import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
declare var $;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, AfterViewInit {
  @Input() puntuacion;
  @Output() puntuacionUsuarioEmit = new EventEmitter<number>();
  puntuacionUsuario;
  constructor() { }

  ngOnInit() { }
  ngAfterViewInit(): void {
    $('.ui.rating').rating({
      maxRating: 5,
    });
    $('.ui.rating').rating('enable');
  }
  emitirPuntuacion(event: any) {
    event.preventDefault();
    $('.ui.rating').rating('setting', 'onRate', (value) => {
      this.puntuacionUsuario = value;
      console.log('MI PUNTUACION ES: ' + this.puntuacionUsuario);
      this.puntuacionUsuarioEmit.emit(this.puntuacionUsuario);
    });
  }
}
