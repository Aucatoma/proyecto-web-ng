import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CredencialesService} from '../credenciales/credenciales.service';
import {TarjetaCredito} from '../entidades/tarjeta-credito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaCreditoService {

  ip = 'localhost';
  puerto = '3000';
  url = `http://${this.ip}:${this.puerto}/tarjeta-credito`;
  httpOptions = {};

  constructor(
    private _httpClient: HttpClient,
    private _credencialesService: CredencialesService,
  ) {
    if(this._credencialesService.estaLogeado) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
          'Content-type': 'application/json',
        })
      };
    }
  }

  obtenerTarjetas(): Observable<TarjetaCredito[]> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    return this._httpClient.get<TarjetaCredito[]>(this.url, this.httpOptions);
  }

  crearTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    return this._httpClient.post<TarjetaCredito>(this.url, JSON.stringify(tarjeta), this.httpOptions);
  }

  editarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    console.log(tarjeta.id);
    return this._httpClient.put<TarjetaCredito>(`${this.url}/${tarjeta.id}`, JSON.stringify(tarjeta), this.httpOptions);
  }

  eliminarTarjeta(id: number): Observable<object> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    return this._httpClient.delete<object>(`${this.url}/${id}`, this.httpOptions);
  }
}
