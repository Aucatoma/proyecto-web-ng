import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Observable} from 'rxjs';
import {Jwt} from '../entidades/jwt';
import {Credenciales} from '../entidades/credenciales';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private url = 'http://localhost:3000/login';

  constructor(
    private httpClient: HttpClient
  ) {}

  login(username: string, constrasenia: string): Observable<Credenciales> {
    const body = `{"username": "${username}", "contrasenia":"${constrasenia}"}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.httpClient.post<Credenciales>(this.url, body, httpOptions);
  }
}
