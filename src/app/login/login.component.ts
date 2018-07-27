import { Component, OnInit } from '@angular/core';
import {LoginAuthService} from '../authorization/login-auth.service';
import {Router} from '@angular/router';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Location} from '@angular/common';
import {Libro} from '../entidades/libro';
import {LibroService} from '../service/libro.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = undefined;
  libros: Libro[];
  constructor(
    private readonly _loginAuthService: LoginAuthService,
    private readonly _credencialesService: CredencialesService,
    private router: Router,
    private _location: Location,
    private _libroService: LibroService
  ) {
    //this._location.back();
  }

  ngOnInit() {
    const libros$ = this._libroService.obtenerTodos();
    libros$.subscribe(value => {
      this.libros = value;
      console.log(this.libros);
    }, error1 => console.log(error1));
  }

  login(form) {
    const username = form.controls.username.value;
    const contrasenia = form.controls.contrasenia.value;

    const login$ = this._loginAuthService.login(username, contrasenia);
    login$.subscribe(value => {
        this.error = undefined;
        this._credencialesService.login(value.token);
      },
      error1 => {
        this.error = 'Lo sentimos, intenta de nuevo';
        console.log(error1);
      });
  }
}
