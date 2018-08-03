import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioService} from './usuario.service';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Observable} from 'rxjs';
import {Usuario} from '../entidades/usuario';


@Injectable({
  providedIn: 'root'
})
export class ConfigService{

  urlUsuario = 'http://localhost:3000/usuario';
  constructor(
    private readonly _httpClient: HttpClient
  ) {
    console.log('constructor config');
  }


  configurar(jwt): Observable<Usuario> {
    console.log('ConfigService', 'Configurar');
    return this.obtenerUsuario(jwt);
  }

  obtenerUsuario(jwt): Observable<Usuario> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  `${jwt}`,
      })
    };
    return this._httpClient.get<Usuario>(this.urlUsuario, httpOptions);
  }
}
