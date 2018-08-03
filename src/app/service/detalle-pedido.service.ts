import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DetallePost} from '../entidades/detalle-post';

@Injectable({
  providedIn: 'root',
})
export class DetallePedidoService {
  url = 'http://localhost:3000/detalle-pedido';
  constructor(private _httpClient: HttpClient) { }
  insertarDetalle(detalle: DetallePost): Observable<DetallePost> {
    return this._httpClient.post<DetallePost>(`${this.url}`, detalle);
  }
}
