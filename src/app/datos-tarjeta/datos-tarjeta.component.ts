import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-datos-tarjeta',
  templateUrl: './datos-tarjeta.component.html',
  styleUrls: ['./datos-tarjeta.component.css']
})
export class DatosTarjetaComponent implements OnInit {

  @HostBinding('attr.class') clase = 'col-sm-4';

  meses = ['01', '02', '03', '04', '05', '05', '07', '08', '09', '10', '11', '12'];
  anios = [];
  tarjetas = ['Elija el tipo', 'Visa', 'Mastercard', 'American Express'];
  constructor() {
    let i;
    for (i = 0; i <= 99; i++) {
      if ((i + '').length < 2) {
        this.anios.push('0' + i.toString());
      } else {
        this.anios.push(i);
      }
    }
  }

  ngOnInit() {
  }

}
