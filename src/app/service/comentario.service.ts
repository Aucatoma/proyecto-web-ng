import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comentario} from '../entidades/comentario';
import {Autor} from '../entidades/autor';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  url = 'http://localhost:3000/comentario';
  constructor(private _httpClient: HttpClient) { }

  obtenerTodos(): Observable<Comentario[]> {
    return this._httpClient.get<Comentario[]>(this.url);
  }
  obtenerPorLibroId(id: string): Observable<Comentario[]> {
    return this._httpClient.get<Comentario[]>(`${this.url}/libro/${id}`);
  }
}
