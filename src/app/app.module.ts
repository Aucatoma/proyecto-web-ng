import { BrowserModule } from '@angular/platform-browser';

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
import {SpeechTextService} from './service/speech-text.service';
import {SpeechTextComponent} from './speech-text/speech-text.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';
import { CabeceraPedidoComponent } from './cabecera-pedido/cabecera-pedido.component';
import { CarritoComprasComponent } from './carrito-compras/carrito-compras.component';
import {ConfigService} from './service/config.service';
import {TarjetaCreditoService} from './service/tarjeta-credito.service';
import {APP_INITIALIZER, NgModule} from '@angular/core';


export function init_app(credencialesService: CredencialesService) {
  return () => credencialesService.configurar();
}

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
    SpeechTextComponent,
    DetallePedidoComponent,
    CabeceraPedidoComponent,
    CarritoComprasComponent,
  ],
  imports: [
    BrowserModule,
    RutasModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    CredencialesService,
    ConfigService,
    LoginAuthService,
    LibroService,
    AutorService,
    GeneroService,
    EditorialService,
    ComentarioService,
    SpeechTextService,
    TarjetaCreditoService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [CredencialesService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
  ) {
  }
}
