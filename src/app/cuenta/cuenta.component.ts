import {AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Usuario} from '../entidades/usuario';
import {TarjetaCredito} from '../entidades/tarjeta-credito';
import {TarjetaCreditoService} from '../service/tarjeta-credito.service';
import {ConfigService} from '../service/config.service';
import {UsuarioService} from '../service/usuario.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {


  usuario: Usuario;
  tarjetaSeleccionada: TarjetaCredito;
  crearTarjeta = false;
  tarjetas: TarjetaCredito[];

  constructor(
    private readonly _credencialesService: CredencialesService,
    private readonly _tarjetaService: TarjetaCreditoService,
    private readonly _usuarioService: UsuarioService,
  ) {
  }

  ngOnInit() {
    const usuario = this._credencialesService.credenciales.usuario;
    this.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      username: usuario.username,
      correo: usuario.correo,
      contrasenia: usuario.contrasenia,
      imagenUrl: usuario.imagenUrl,
    };
    const tarjetas$ = this._tarjetaService.obtenerTarjetas();
    tarjetas$.subscribe(value => {
      this.tarjetas = value;
      console.log(this.tarjetas);
    }, error1 => console.log(error1));
  }

  editarUsuario(usuario) {
    console.log('Emitiendo', usuario);
    const usuario$ = this._usuarioService.editarUsuario(usuario);
    usuario$.subscribe(
      value => {
        console.log('Servidor:', value);
        this.usuario = value;
        this._credencialesService.credenciales.usuario = value;
        location.reload();
      },
      error1 => { console.log(error1); }
    );
  }

  mostrarEdicion(tarjeta) {
    this.tarjetaSeleccionada = tarjeta;
    this.crearTarjeta = false;
    console.log('clic');
  }

  mostrarAnadir() {
    this.tarjetaSeleccionada = undefined;
    this.crearTarjeta = true;
  }

  ingresarTarjeta(tarjeta) {
    console.log(tarjeta);
    const tarjeta$ = this._tarjetaService.crearTarjeta(tarjeta);
    tarjeta$.subscribe(value => {
        const tarjetas = this.tarjetas.map(value1 => { return value1; });
        tarjetas.push(value);
        this.tarjetas = tarjetas;
        this.crearTarjeta = false;
      }, error1 => console.log(error1));
  }

  editarTarjeta(tarjeta) {
    const tarjeta$ = this._tarjetaService.editarTarjeta(tarjeta);
    tarjeta$.subscribe(value => {
      this.tarjetas = this.tarjetas.map(value1 => {
        if (value1.id === value.id) {
            return value;
        }
        return value1;
      });
      this.tarjetaSeleccionada = undefined;
    });
    console.log(this.tarjetas);
  }
  eliminarTarjeta(evento){
    const id = evento.tarjeta.id;
    const eliminacion$ = this._tarjetaService.eliminarTarjeta(id);
    eliminacion$.subscribe(
      value => {
        location.reload();
        },
      error1 => console.log(error1)
    );
    location.reload();
    //this.tarjetas.push({ id: 1, numero: '', anio: 12, mes: 1, codigo: '', tipo: ''});
    //const tarjetas = this.tarjetas.map(value => { return value; });
    //tarjetas.splice(evento.indice - 1, 1);
    //this.tarjetas = tarjetas;
    /*this.tarjetas.splice(evento.indice - 1, 1);
    console.log(this.tarjetas);*/
  }

}
