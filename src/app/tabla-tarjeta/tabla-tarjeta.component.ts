import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TarjetaCredito} from '../entidades/tarjeta-credito';

@Component({
  selector: 'app-tabla-tarjeta',
  templateUrl: './tabla-tarjeta.component.html',
  styleUrls: ['./tabla-tarjeta.component.css']
})
export class TablaTarjetaComponent implements OnInit, AfterViewInit, OnChanges {


  @Input() tarjetasRecv: TarjetaCredito[];
  @Output() tarjetaOutput = new EventEmitter<TarjetaCredito>();
  tarjetas: TarjetaCredito[];
  indicePaginacion = Array();
  liActive: HTMLElement;
  current = 0;
  end = 2;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
  }


  ngOnInit() {
    for (let i = 0; i < this.tarjetasRecv.length / 2 ; i++) {
      this.indicePaginacion.push(i + 1);
    }
    this.tarjetas = this.tarjetasRecv.slice(this.current, this.end);
  }

  ngAfterViewInit() {
    this.liActive = document.getElementById((this.end / 2) + '');
    this.liActive.classList.add('active');
    document.getElementById('prev').classList.add('disabled');
  }



  emitirTarjeta(tarjeta) {
    this.tarjetaOutput.emit(tarjeta);
  }

  tomarAnteriores(evento) {
    console.log('Anteriores')
    evento.preventDefault();
    if ((this.current - 2) >= 0 ) {
      document.getElementById('next').classList.remove('disabled');
      console.log('tomando anteriores');
      this.current -= 2;
      this.end -= 2;
      if(this.current === 0) {
        document.getElementById('prev').classList.add('disabled');
      }
      if (this.liActive !== undefined) {
        this.liActive.classList.remove('active');
      }
      this.liActive = document.getElementById((this.end / 2) + '');
      this.liActive.classList.add('active');
      this.tarjetas = this.tarjetasRecv.slice(this.current, this.end);
    } else {
        document.getElementById('prev').classList.add('disabled');
      }
  }

  tomarSiguientes(evento) {
    console.log('siguientes')
    evento.preventDefault();
    if ((this.end + 2) <= this.tarjetasRecv.length || (this.end + 1) <=  this.tarjetasRecv.length) {
      document.getElementById('prev').classList.remove('disabled');
      this.current += 2;
      this.end += 2;
      if(this.end >= this.tarjetasRecv.length){
        document.getElementById('next').classList.add('disabled');
      }
      if (this.liActive !== undefined) {
        this.liActive.classList.remove('active');
      }
      this.liActive = document.getElementById((this.end / 2) + '');
      this.liActive.classList.add('active');
      console.log('tomando siguientes');
      this.tarjetas = this.tarjetasRecv.slice(this.current, this.end);
    } else {
      document.getElementById('next').classList.add('disabled');
    }
  }

  tomarPorIndice(indice, evento, li) {
    evento.preventDefault();
    if(this.liActive !== undefined) {
      this.liActive.classList.remove('active');
    }
    this.liActive = li;
    li.classList.add('active');
    console.log('#', indice % 2);
    if ((indice % 2) !== 0 && indice < 2) {
      this.current = indice - 1;
    } else if ((indice % 2) !== 0 && indice > 2) {
      this.current = indice + 1;
    } else {
      this.current = indice;
    }
    this.end = indice * 2;
    if (this.current === 0) {
      console.log('cero');
      document.getElementById('prev').classList.add('disabled');
    } else {
      document.getElementById('next').classList.remove('disabled');
    }
    if (this.end >= this.tarjetasRecv.length) {
      console.log('último');
      document.getElementById('next').classList.add('disabled');
    } else {
      document.getElementById('prev').classList.remove('disabled');
    }
    console.log(this.current, this.end);
    this.tarjetas = this.tarjetasRecv.slice(this.current, this.end);
  }

}
