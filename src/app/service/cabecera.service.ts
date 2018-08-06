import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CabeceraPedidoPost} from '../entidades/cabecera-pedido-post';
import {Observable} from 'rxjs';
import {CredencialesService} from '../credenciales/credenciales.service';

@Injectable({
  providedIn: 'root',
})
export class CabeceraService {
  url = 'http://localhost:3000/cabecera-pedido';
  httpOptions = {};
  constructor(private _httpClient: HttpClient,
              private _credencialesService: CredencialesService) {
    if (this._credencialesService.estaLogeado) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
          'Content-type': 'application/json',
        })
      };
    }
  }
  insertarCabecera(cabecera: CabeceraPedidoPost): Observable<CabeceraPedidoPost> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    return this._httpClient.post<CabeceraPedidoPost>(`${this.url}`, cabecera, this.httpOptions);
  }
}
