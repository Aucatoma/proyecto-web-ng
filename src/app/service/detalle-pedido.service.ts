import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DetallePost} from '../entidades/detalle-post';
import {CredencialesService} from '../credenciales/credenciales.service';

@Injectable({
  providedIn: 'root',
})
export class DetallePedidoService {
  url = 'http://localhost:3000/detalle-pedido';
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
  insertarDetalle(detalle: DetallePost): Observable<DetallePost> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    return this._httpClient.post<DetallePost>(`${this.url}`, detalle, this.httpOptions);
  }
}
