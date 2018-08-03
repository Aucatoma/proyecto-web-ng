import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  @Output() cantidadTotal = 0;
  @Output() precioTotal = 0;
  constructor() { }

  ngOnInit() {
  }
  guardarCantidadTotal(cantidadTotal) {
    this.cantidadTotal = cantidadTotal;
    // console.log('A CARRITO SE EMITIO ESTO EN CANTIDAD TOTAL: ' + this.cantidadTotal);
  }
  guardarPrecioTotal(precioTotal) {
    this.precioTotal = precioTotal;
    // console.log('A CARRITO SE EMITIO ESTO EN PRECIO TOTAL: ' + this.precioTotal);
  }

}
