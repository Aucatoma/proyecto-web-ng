import { Injectable } from '@angular/core';
import {Usuario} from '../entidades/usuario';
import {Credenciales} from '../entidades/credenciales';
import {ConfigService} from '../service/config.service';


@Injectable({
  providedIn: 'root'
})
export class CredencialesService {

  estaLogeado = false;
  credenciales: Credenciales;

  constructor(
    private _configService: ConfigService
  ) {
    console.log('CredencialesService', 'constructor');

  }


  login(credenciales) {
    this.credenciales = credenciales;
    this.estaLogeado = true;
    console.log('Credenciales', this.credenciales);
    document.cookie = `jwt=${this.credenciales.jwt.token}`;
  }

  logout() {
    this.credenciales = undefined;
    this.estaLogeado = false;
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  configurar(): Promise<any> {
    const jwtoken = this.getCookie('jwt');
    if (jwtoken !== '') {
      const promise = this._configService.configurar(jwtoken).toPromise()
        .then(value => {
          console.log('Configurando valores');
          const credenciales = {
            usuario: value,
            jwt: {token: jwtoken}
          };
          this.login(credenciales);
          return this.credenciales;
        });
      return promise;
    } else {
      //return new Promise(resolve => {});
    }
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
