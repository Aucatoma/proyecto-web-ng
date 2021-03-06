import {AfterViewInit, Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TarjetaCredito} from '../entidades/tarjeta-credito';

@Component({
  selector: 'app-datos-tarjeta',
  templateUrl: './datos-tarjeta.component.html',
  styleUrls: ['./datos-tarjeta.component.css']
})
export class DatosTarjetaComponent implements OnInit, OnChanges{

  @Input() tarjeta: TarjetaCredito;

  @Output() tarjetaEmit = new EventEmitter<TarjetaCredito>();

  meses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  anios = [];
  tipos = ['Elija el tipo', 'Visa', 'Mastercard', 'American Express'];
  icono: string;

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
    if (this.tarjeta === undefined) {
      this.tarjeta = {
        id: 0,
        numero: '',
        codigo: '',
        mes: 1,
        anio: 12,
        tipo: 'Elija el tipo'
      };
    }
    this.establecerIcono(this.tarjeta.tipo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.tarjeta);
    console.log('Cambiando');
    this.establecerIcono(changes.tarjeta.currentValue.tipo);
  }

  emitirTarjeta(form) {
    this.tarjeta.numero = form.controls.num_tarjeta.value;
    this.tarjeta.codigo = form.controls.cod_tar.value;
    this.tarjeta.tipo = form.controls.tipo_tar.value;
    this.tarjetaEmit.emit(this.tarjeta);
  }

  cambiarIcono(evento) {
    const tipo = evento.target.value;
    this.establecerIcono(tipo);
    console.log(this.icono);
  }


  establecerIcono(tipo: string) {
    if (tipo === 'Visa') {
      this.icono = 'assets/icon/visa.png';
    }
    if (tipo === 'Mastercard') {
      this.icono = 'assets/icon/mastercard.png';
    }
    if (tipo === 'American Express') {
      this.icono = 'assets/icon/american-express.png';
    }
    if (tipo === 'Elija el tipo') {
      this.icono = 'assets/icon/credit-card.png';
    }
  }

}
