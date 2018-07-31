import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Autor} from '../entidades/autor';
import {Observable} from 'rxjs';
import {Genero} from '../entidades/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  url = 'http://localhost:3000/genero';

  constructor(
    private _httpClient: HttpClient
  ) { }

  obtenerPorLibroId(id: string): Observable<Genero> {
    return this._httpClient.get<Genero>(`${this.url}/libro/${id}`);
  }
}
