import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Observable} from 'rxjs';
import {Jwt} from '../entidades/token';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private url = 'http://localhost:3000/login';

  constructor(
    private httpClient: HttpClient
  ) {}

  login(username: string, constrasenia: string): Observable<Jwt> {
    const body = `{"username": "${username}", "contrasenia":"${constrasenia}"}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.httpClient.post<Jwt>(this.url, body, httpOptions);
  }
}
