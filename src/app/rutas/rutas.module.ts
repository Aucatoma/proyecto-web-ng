import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {HomeComponent} from '../home/home.component';
import {RegistroComponent} from '../registro/registro.component';
import {CatalogoComponent} from '../catalogo/catalogo.component';
import {CuentaComponent} from '../cuenta/cuenta.component';
import {DetalleComponent} from '../detalle/detalle.component';
import {CarritoComprasComponent} from '../carrito-compras/carrito-compras.component';
import {AuthGuard} from '../auth.guard';
import {LoggedGuard} from '../logged.guard';

const rutas: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard]},
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'detalle/:id', component: DetalleComponent},
  { path: 'carrito', component: CarritoComprasComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(rutas)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RutasModule { }
