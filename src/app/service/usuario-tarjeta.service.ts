import { Injectable } from '@angular/core';
import {CredencialesService} from '../credenciales/credenciales.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioTarjeta} from '../entidades/usuario-tarjeta';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTarjetaService {
  url = 'http://localhost:3000/usuario-tarjeta';
  httpOptions = {};

  constructor(private _httpClient: HttpClient,
              private _credencialesService: CredencialesService) {
    if(this._credencialesService.estaLogeado){
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
          'Content-type': 'application/json',
        })
      };
    }
  }
  obtenerPorUsuarioTarjetaId(usuarioId, tarjetaId): Observable<UsuarioTarjeta> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    return this._httpClient.get<UsuarioTarjeta>(`${this.url}/?usuarioId=${usuarioId}&tarjetaId=${tarjetaId}`);
  }
}
