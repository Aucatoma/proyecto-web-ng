import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CabeceraPedidoPost} from '../entidades/cabecera-pedido-post';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CabeceraService {
  url = 'http://localhost:3000/cabecera-pedido';
  constructor(private _httpClient: HttpClient) { }
  insertarCabecera(cabecera: CabeceraPedidoPost): Observable<CabeceraPedidoPost> {
    return this._httpClient.post<CabeceraPedidoPost>(`${this.url}`, cabecera);
  }
}
