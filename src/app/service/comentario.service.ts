import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comentario} from '../entidades/comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  url = 'http://localhost:3000/comentario';
  constructor(private _httpClient: HttpClient) { }
  obtenerTodos(): Observable<Comentario[]> {
    return this._httpClient.get<Comentario[]>(this.url);
  }
}
