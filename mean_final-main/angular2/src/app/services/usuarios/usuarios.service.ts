import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModule } from 'src/app/models/usuario/usuario.module';

@Injectable({
  providedIn: 'root'
})


export class UsuariosService {


  selectedUsuario: UsuarioModule;
  usuarios: UsuarioModule[] = [];
  
  //currentuser: UsuarioModule;
  // instanciamos el httpclient en el constructor de la clase
  constructor(private http: HttpClient) { 
    this.selectedUsuario = new UsuarioModule(
      '',
      'Administrador',
      ''
      )
    /* ;this.currentuser = new UsuarioModule(
      '',
      'Cliente',
      '' )*/
  } 

  // Uri del http
  uri = "http://localhost:3000/usuarios"


  

  // Nos devolvera un arreglo de empleados que vendran desde nuestro servidor
  getUsuarios(){
    return this.http.get(this.uri);
  }

  postUsuario(usuario: UsuarioModule){
    // al hacer el post tendremos que pasarle la url y el dato que le queremos pasar que en nuestro caso sera el usuario
    return this.http.post(this.uri, usuario);

  }

  putUsuario(usuario: UsuarioModule){ 
    // put necesita lo mismo pero nosotros en nuestra api rest le tenemos que pasar el id del empleado para que este
    // sepa cual es el que tiene que cambiar y de ahi el  + `/${monitor._id}
    return this.http.put(this.uri + `/${usuario._id}`, usuario );
  }

  deleteUsuario(id: String){
    // Aqui lo mismo que antes usamos el metodo delete de http y le mandamos el id del monitor que queremos eliminar
    return this.http.delete(this.uri + `/${id}`);
  }

  // Busca por nombre
  findByNombre(nombre: String){
    return this.http.get(this.uri + `/nombre/${nombre}`);
  }

  // Busca por id
  findByID(id: String){
    return this.http.get(this.uri + `/id/${id}`);
  }

  // Busca por id y devuelve el rol
  findRol(id: String){
    return this.http.get(this.uri + `/role/${id}`);
  }
  // Busca por rol y devuelve el usuario
  findByRole(role: String) {
    return this.http.get(this.uri + `/roles/${role}`);
  }
}

