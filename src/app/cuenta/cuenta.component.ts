import {Component, DoCheck, OnInit} from '@angular/core';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Usuario} from '../entidades/usuario';
import {TarjetaCredito} from '../entidades/tarjeta-credito';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit, DoCheck {


  usuario: Usuario = undefined;
  tarjetaSeleccionada: TarjetaCredito;
  crearTarjeta = false;
  tarjetas: TarjetaCredito[] = [
    {
      id: 1,
      anio: 21,
      mes: 1,
      codigo: '322',
      numero: '223090193',
      tipo: 'Visa',
    },
    {
      id: 2,
      anio: 22,
      mes: 3,
      codigo: '312',
      numero: '045590193',
      tipo: 'Mastercard',
    },
    {
      id: 3,
      anio: 23,
      mes: 3,
      codigo: '132',
      numero: '7455902123',
      tipo: 'American Express',
    },
    {
      id: 4,
      anio: 24,
      mes: 3,
      codigo: '319',
      numero: '145590193',
      tipo: 'Mastercard',
    },
    {
      id: 5,
      anio: 25,
      mes: 4,
      codigo: '315',
      numero: '94321590193',
      tipo: 'Mastercard',
    },
  ];
  constructor(
    private readonly _credencialesService: CredencialesService
  ) {

  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (this._credencialesService.estaLogeado) {
      this.usuario = this._credencialesService.credenciales.usuario;
    }
  }


  mostrarEdicion(tarjeta) {
    this.tarjetaSeleccionada = tarjeta;
    console.log('clic');
  }

  mostrarAnadir() {
    this.tarjetaSeleccionada = undefined;
    this.crearTarjeta = true;
  }

}
