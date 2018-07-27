import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {

  estaLogeado = false;
  jsonwebtoken = '';

  constructor() { }

  login(jsonwebtoken){
    this.jsonwebtoken = jsonwebtoken.token;
    this.estaLogeado = true;
  }

  logout(){
    this.jsonwebtoken = '';
    this.estaLogeado = false;
  }

}
