import { Component } from '@angular/core';
import {CredencialesService} from './credenciales/credenciales.service';
import {UsuarioService} from './service/usuario.service';
import {Credenciales} from './entidades/credenciales';
import {subscribeToArray} from 'rxjs/internal/util/subscribeToArray';
import {Usuario} from './entidades/usuario';
import {Jwt} from './entidades/jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Book sales';


  constructor(
    private readonly credencialesService: CredencialesService,
    private readonly usuarioService: UsuarioService
  ) {
    const jwt = this.getCookie('jwt');
    const usuario$ = this.usuarioService.obtenerUsuario(jwt);

    usuario$.subscribe(value => {
      const usuarioRecv = value;
      const jwtoken =  {
        token: jwt,
      };
      const credenciales = {
        usuario: value,
        jwt: jwtoken
      };
      this.credencialesService.login(credenciales);
    }, error1 => console.log(error1));
  }

  getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
