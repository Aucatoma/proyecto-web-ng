import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cabecera-pedido',
  templateUrl: './cabecera-pedido.component.html',
  styleUrls: ['./cabecera-pedido.component.css']
})
export class CabeceraPedidoComponent implements OnInit {
  @Input() cantidadTotal;
  @Input() precioTotal;
  constructor() { }

  ngOnInit() {
  }

}
