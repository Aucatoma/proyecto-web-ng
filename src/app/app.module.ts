import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import {RutasModule} from './rutas/rutas.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginAuthService} from './authorization/login-auth.service';
import { MenuComponent } from './menu/menu.component';
import {LibroService} from './service/libro.service';
import {BarraBusquedaComponent} from './barra-busqueda/barra-busqueda.component';
import { CardBookComponent } from './card-book/card-book.component';
import {CredencialesService} from './credenciales/credenciales.service';
import { RatingComponent } from './rating/rating.component';
import { RegistroComponent } from './registro/registro.component';
import {UsuarioService} from './service/usuario.service';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { DatosTarjetaComponent } from './datos-tarjeta/datos-tarjeta.component';

import { CatalogoComponent } from './catalogo/catalogo.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { TablaTarjetaComponent } from './tabla-tarjeta/tabla-tarjeta.component';
import { MesPipe } from './pipe/mes.pipe';
import { DetalleLibroComponent } from './detalle-libro/detalle-libro.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { DetalleComponent } from './detalle/detalle.component';
import {AutorService} from './service/autor.service';
import {GeneroService} from './service/genero.service';
import {EditorialService} from './service/editorial.service';
import {ComentarioService} from './service/comentario.service';

@NgModule({
  declarations: [
    AppComponent,
    CarruselComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    BarraBusquedaComponent,
    CardBookComponent,
    RatingComponent,
    RegistroComponent,
    DatosPersonalesComponent,
    DatosTarjetaComponent,
    CatalogoComponent,
    CuentaComponent,
    TablaTarjetaComponent,
    MesPipe,
    DetalleLibroComponent,
    ComentariosComponent,
    DetalleComponent,
  ],
  imports: [
    BrowserModule,
    RutasModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    LoginAuthService,
    LibroService,
    CredencialesService,
    AutorService,
    GeneroService,
    EditorialService,
    ComentarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
