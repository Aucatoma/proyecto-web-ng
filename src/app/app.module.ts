import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import {RutasModule} from './rutas/rutas.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LoginAuthService} from './authorization/login-auth.service';
import { MenuComponent } from './menu/menu.component';
import {LibroService} from './service/libro.service';
import {BarraBusquedaComponent} from './barra-busqueda/barra-busqueda.component';
import { CardBookComponent } from './card-book/card-book.component';
import {StarRatingModule} from 'angular-star-rating';
import { RatingComponent } from './rating/rating.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

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
    CatalogoComponent,
  ],
  imports: [
    BrowserModule,
    RutasModule,
    HttpClientModule,
    FormsModule,
    StarRatingModule.forRoot(),
  ],
  providers: [LoginAuthService, LibroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
