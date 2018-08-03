import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioEdicion} from '../entidades/usuario-edicion';
import {Observable} from 'rxjs';
import {Credenciales} from '../entidades/credenciales';
import {Jwt} from '../entidades/jwt';
import {Usuario} from '../entidades/usuario';
import {CredencialesService} from '../credenciales/credenciales.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlRegistro = 'http://localhost:3000/registro';
  urlUsuario = 'http://localhost:3000/usuario';

  httpOptions = {};

  constructor(
    private _httpClient: HttpClient,
    private readonly _credencialesService: CredencialesService,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `${this._credencialesService.credenciales.jwt.token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  obtenerUsuario(jwt): Observable<Usuario> {
    return this._httpClient.get<Usuario>(this.urlUsuario, this.httpOptions);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this._httpClient.put<Usuario>(`${this.urlUsuario}/${usuario.id}`, JSON.stringify(usuario), this.httpOptions);
  }

  registrar(usuario: UsuarioEdicion): Observable<Credenciales> {
    return this._httpClient.post<Credenciales>(this.urlRegistro, JSON.stringify(usuario), this.httpOptions);
  }


}
