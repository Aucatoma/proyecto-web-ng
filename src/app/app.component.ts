import {Component, OnInit} from '@angular/core';
import {CredencialesService} from './credenciales/credenciales.service';
import {UsuarioService} from './service/usuario.service';
import {ConfigService} from './service/config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Book sales';


  constructor(
  ) {
  }
}
