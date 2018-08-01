import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Texto} from '../entidades/texto';

@Injectable({
  providedIn: 'root'
})
export class SpeechTextService {
  url = 'http://localhost:3000/speech-text';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private _httpClient: HttpClient
  ) { }


  obtenerTexto(audioB64): Observable<Texto> {
    return this._httpClient.post<Texto>(this.url, `{"audio": "${audioB64}"}`, this.httpOptions);
  }


}
