import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoresComponent } from './components/monitores/monitores.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { InsertarMonitorComponent } from './components/insertar/insertar-monitor/insertar-monitor.component';
import { InsertarUsuarioComponent } from './components/insertar/insertar-usuario/insertar-usuario.component';


// Aqui vamos a definir los componentes que vamos a usar segun la ruta en la que estemos
const routes: Routes = [
  {path: '', redirectTo: 'usuario/insertar', pathMatch: 'full'},
  //{path: 'inicio-sesion', component: InicioSesionComponent},
  {path: 'cliente/monitores', component: MonitoresComponent},
  {path: 'usuario/insertar', component: InsertarUsuarioComponent},
  {path: 'cliente/pedidos', component: PedidosComponent},
  {path: 'administracion/monitores', component: InsertarMonitorComponent},
  {path: 'administracion/usuarios', component: UsuariosComponent},
//  {path: 'administracion/users', component: InsertarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
