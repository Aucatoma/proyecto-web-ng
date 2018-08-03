import { Component, OnInit } from '@angular/core';
import {TarjetaCreditoService} from '../service/tarjeta-credito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _tarjetaService: TarjetaCreditoService
  ) {
    console.log('Constructor home');
  }

  ngOnInit() {
    const tarjetas$ = this._tarjetaService.obtenerTarjetas();
    tarjetas$.subscribe(
      value => console.log(value),
      error1 => console.log(error1)
    );
  }

}
