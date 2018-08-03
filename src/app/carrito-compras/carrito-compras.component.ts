import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  @Output() cantidadTotal = 0;
  constructor() { }

  ngOnInit() {
  }
  guardarCantidad(cantidad) {
    this.cantidadTotal = cantidad;
  }

}
