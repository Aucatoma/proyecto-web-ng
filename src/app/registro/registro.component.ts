import { Component, OnInit } from '@angular/core';
import {Usuario} from '../entidades/usuario';
import {UsuarioService} from '../service/usuario.service';
import {UsuarioEdicion} from '../entidades/usuario-edicion';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly credencialesService: CredencialesService,
    private _router: Router,
  ) {

  }


  ngOnInit() {
  }

  registro(usuario: UsuarioEdicion) {
    console.log(usuario);
    const crendenciales$ = this.usuarioService.registrar(usuario);
    crendenciales$.subscribe(value => {
      this.credencialesService.login(value);
      this._router.navigate(['/catalogo']);
    }, error1 => {
      console.log(error1);
    });
  }


}
