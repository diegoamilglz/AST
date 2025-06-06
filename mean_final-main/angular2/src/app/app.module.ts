import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonitoresComponent } from './components/monitores/monitores.component';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { PedidosComponent } from './components/pedidos/pedidos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { InsertarMonitorComponent } from './components/insertar/insertar-monitor/insertar-monitor.component';
import { InsertarUsuarioComponent } from './components/insertar/insertar-usuario/insertar-usuario.component';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent, // Declaracion del componente principar 
    MonitoresComponent, PedidosComponent, UsuariosComponent, InsertarMonitorComponent, InsertarUsuarioComponent, NavbarComponent, // Declaramos el componente de monitores
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Para poder trabajar con rutas
    FormsModule, // Esto se importa para poder trabajar con formularios
    HttpClientModule, // Lo necesitamos para los servicios
    // ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
