import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Autor} from '../entidades/autor';
import {Observable} from 'rxjs';
import {Editorial} from '../entidades/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  url = 'http://localhost:3000/editorial';

  constructor(
    private _httpClient: HttpClient
  ) { }

  obtenerPorLibroId(id: string): Observable<Editorial> {
    return this._httpClient.get<Editorial>(`${this.url}/libro/${id}`);
  }
}
