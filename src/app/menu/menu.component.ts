import {Component, DoCheck, HostBinding, OnInit} from '@angular/core';
import {CredencialesService} from '../credenciales/credenciales.service';
import {Usuario} from '../entidades/usuario';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario: Usuario;
  @HostBinding('attr.class') cssClass = 'no-padding col-sm-12';

  constructor(
    private readonly _credencialesService: CredencialesService,
    private _router: Router
  )
  {
    console.log('Soy menu', this._credencialesService.estaLogeado);
    if (this._credencialesService.estaLogeado) {
      this.usuario = this._credencialesService.credenciales.usuario;
    }
  }

  ngOnInit() {
  }


  logout(evento) {
    evento.preventDefault();
    this._credencialesService.logout();
    this._router.navigate(['/home']);
  }

}
