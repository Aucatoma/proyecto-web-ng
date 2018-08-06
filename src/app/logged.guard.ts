import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {CredencialesService} from './credenciales/credenciales.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(
    private readonly _credencialesService: CredencialesService,
    private _router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._credencialesService.estaLogeado) {
      console.log('Está');
      this._router.navigate(['/cuenta']);
      return false;
    } else {
      console.log('No Está');
      return true;
    }
  }
}
