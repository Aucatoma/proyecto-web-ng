import {Component, Input, OnInit} from '@angular/core';
import {CabeceraPedidoPost} from '../entidades/cabecera-pedido-post';
import {CarritoComprasService} from '../service/carrito-compras.service';
import {CredencialesService} from '../credenciales/credenciales.service';
import {CabeceraService} from '../service/cabecera.service';
import {DetallePost} from '../entidades/detalle-post';
import {DetallePedidoService} from '../service/detalle-pedido.service';
import {Router} from '@angular/router';
import {TarjetaCreditoService} from '../service/tarjeta-credito.service';
import {TarjetaCredito} from '../entidades/tarjeta-credito';
import {UsuarioTarjeta} from '../entidades/usuario-tarjeta';
import {UsuarioTarjetaService} from '../service/usuario-tarjeta.service';
declare var $;

@Component({
  selector: 'app-cabecera-pedido',
  templateUrl: './cabecera-pedido.component.html',
  styleUrls: ['./cabecera-pedido.component.css']
})
export class CabeceraPedidoComponent implements OnInit {
  @Input() cantidadTotal;
  @Input() subtotal;
  @Input() precioFinal;
  fechaCabecera = '';
  numeroCabecera = '';
  numeroTarjeta = '';
  tipoTarjeta = '';
  idTarjetaEscogida = 0;
  cabeceraPedido = new CabeceraPedidoPost();
  detallesAInsertar: DetallePost[] = [];
  tarjetasCreditoUsuario: TarjetaCredito[] = [];
  error = undefined;
  exito = undefined;
  constructor(private _router: Router,
              private _carritoComprasService: CarritoComprasService,
              private _credencialesService: CredencialesService,
              private _cabeceraService: CabeceraService,
              private _detalleService: DetallePedidoService,
              private _tarjetaCreditoService: TarjetaCreditoService,
              private _usuarioTarjetaService: UsuarioTarjetaService) {

  }
  ngOnInit() {
    this.numeroTarjeta = 'Elija su tarjeta';
    this.obtenerTarjetas();
  }
  registrarPedido() {
    if (this._credencialesService.credenciales !== undefined) {
      if (this.idTarjetaEscogida === 0) {
        this.error = 'Por favor, seleccione una tarjeta de crédito';
      } else if (this.cantidadTotal === 0) {
        this.error = 'Por favor, seleccione al menos un libro';
      } else {
        this.generarFecha();
        this.generarNumero();
        const usuarioTarjeta$ = this._usuarioTarjetaService.obtenerPorUsuarioTarjetaId(this._credencialesService.credenciales.usuario.id, this.idTarjetaEscogida);
        usuarioTarjeta$.subscribe(
          value => {
            this.cabeceraPedido.usuarioTarjeta = value.id;
            this.cabeceraPedido.numero = this.numeroCabecera;
            this.cabeceraPedido.fecha = this.fechaCabecera;
            this.cabeceraPedido.iva = 12;
            this.error = undefined;
            console.log(JSON.stringify(this.cabeceraPedido));
            this.insertarCabecera();
          }, error1 => {console.log(error1); });
      }
    } else {
      this.error = 'Necesita iniciar sesión o registrarse para comprar';
    }
  }
  generarFecha() {
    this.fechaCabecera = new Date().toLocaleDateString('en-US');
  }
  generarNumero() {
    const dia = new Date().getDay().toString();
    const mes = new Date().getMonth().toString();
    const anio = new Date().getFullYear().toString();
    const hora = new Date().getHours().toLocaleString();
    const minuto = new Date().getMinutes().toLocaleString();
    const segundos = new Date().getSeconds().toLocaleString();
    this.numeroCabecera = anio + mes + dia + hora + minuto + segundos;
  }
  insertarCabecera() {
    const cabeceraInsertada$ = this._cabeceraService.insertarCabecera(this.cabeceraPedido);
    cabeceraInsertada$.subscribe(
      value => {
        console.log('Cabecera insertada:');
        console.log(value);
        this.cabeceraPedido.id = value.id;
         this.insertarDetalle();
      }, error1 => {console.log(error1); });
  }
  private insertarDetalle() {
    for (const detalle of this._carritoComprasService.detalles) {
      this.detallesAInsertar.splice(this.detallesAInsertar.length, 0, new DetallePost(detalle.cantidad, this.cabeceraPedido.id, detalle.libro.id));
    }
    for (const detalle of this.detallesAInsertar) {
      const detalle$ = this._detalleService.insertarDetalle(detalle);
      detalle$.subscribe(
        value => {
          console.log('Detalle insertado: ');
          console.log(detalle);
          this._carritoComprasService.detalles = [];
          this._carritoComprasService.guardar();
          this.exito = 'Ir al catálogo';
          }, error1 => {console.log(error1); }
      );
    }
  }
  irAlCatalogo () {
    this._router.navigate(['/catalogo']);
  }
  obtenerTarjetas() {
    const tarjetas$ = this._tarjetaCreditoService.obtenerTarjetas();
    tarjetas$.subscribe(
      value => {
        this.tarjetasCreditoUsuario = value;
      },
      error1 => {console.log(error1); }
    );
  }
}
