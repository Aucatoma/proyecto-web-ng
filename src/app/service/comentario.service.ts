import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comentario} from '../entidades/comentario';
import {Autor} from '../entidades/autor';
import {ComentarioGet} from '../entidades/comentario-get';
import {CredencialesService} from '../credenciales/credenciales.service';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  url = 'http://localhost:3000/comentario';
  httpOptions = {};
  constructor(private _httpClient: HttpClient,
              private _credencialesService: CredencialesService) {
    if (this._credencialesService.estaLogeado){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
        })
      };
    }
  }

  obtenerTodos(): Observable<Comentario[]> {
    return this._httpClient.get<Comentario[]>(this.url);
  }
  obtenerPorLibroId(id: string): Observable<Comentario[]> {
    return this._httpClient.get<Comentario[]>(`${this.url}/libro/${id}`);
  }
  obtenerUsuarioComentario(id: string): Observable<ComentarioGet[]> {
    return this._httpClient.get<ComentarioGet[]>(`${this.url}/libro/usuario/${id}`);
  }
  insertarComentario(comentario: Comentario): Observable<Comentario> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${this._credencialesService.credenciales.jwt.token}`,
        'Content-type': 'application/json',
      })
    };
    return this._httpClient.post<Comentario>(`${this.url}`, comentario, this.httpOptions);
  }
}
