import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Libro} from '../entidades/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  url = 'http://localhost:3000/libro';

  constructor(private _httpClient: HttpClient) { }

  obtenerTodos(): Observable<Libro[]> {
    return this._httpClient.get<Libro[]>(this.url);
  }
  obtenerLike(lk: string): Observable<Libro[]>{
    return this._httpClient.get<Libro[]>(this.url + `/search?nombre=${lk}`);
  }
}
