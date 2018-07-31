import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Autor} from '../entidades/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  url = 'http://localhost:3000/autor';

  constructor(
    private _httpClient: HttpClient
  ) { }

  obtenerPorLibroId(id: string): Observable<Autor>{
    return this._httpClient.get<Autor>(`${this.url}/libro/${id}`);
  }
}
