import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioEdicion} from '../entidades/usuario-edicion';
import {Observable} from 'rxjs';
import {Credenciales} from '../entidades/credenciales';
import {Jwt} from '../entidades/jwt';
import {Usuario} from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlRegistro = 'http://localhost:3000/registro';
  urlUsuario = 'http://localhost:3000/usuario';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(
    private _httpClient: HttpClient
  ) { }

  obtenerUsuario(jwt): Observable<Usuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `${jwt}`,
      })
    };
    return this._httpClient.get<Usuario>(this.urlUsuario, httpOptions);
  }

  registrar(usuario: UsuarioEdicion): Observable<Credenciales> {
    return this._httpClient.post<Credenciales>(this.urlRegistro, JSON.stringify(usuario), this.httpOptions);
  }
}
