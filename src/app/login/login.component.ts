import { Component, OnInit } from '@angular/core';
import {LoginAuthService} from '../authorization/login-auth.service';
import {Router} from '@angular/router';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = undefined;
  texto = '';

  constructor(
    private readonly _loginAuthService: LoginAuthService,
    private readonly _credencialesService: CredencialesService,
    private router: Router,
    private _location: Location,
  ) {
  }

  ngOnInit() {
  }

  login(form) {
    const username = form.controls.username.value;
    const contrasenia = form.controls.contrasenia.value;

    const login$ = this._loginAuthService.login(username, contrasenia);
    login$.subscribe(value => {
        this.error = undefined;
        this._credencialesService.login(value);
        this.router.navigate(['/catalogo']);
        },
      error1 => {
        this.error = 'Lo sentimos, intenta de nuevo';
        console.log(error1);
      });
  }
  colocarTexto(texto) {
    document.getElementById('username').value = texto;
  }
}
