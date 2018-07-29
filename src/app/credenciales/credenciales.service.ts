import { Injectable } from '@angular/core';
import {Usuario} from '../entidades/usuario';
import {Credenciales} from '../entidades/credenciales';


@Injectable({
  providedIn: 'root'
})
export class CredencialesService {

  estaLogeado = false;
  credenciales: Credenciales;

  constructor() { }

  login(credenciales) {
    console.log(credenciales.jwt);
    this.credenciales = credenciales;
    this.estaLogeado = true;
    document.cookie = `jwt=${this.credenciales.jwt}`;
  }

  logout() {
    this.credenciales = undefined;
    this.estaLogeado = false;
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

}
