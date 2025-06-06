import { Component } from '@angular/core';
import { UsuarioModule } from 'src/app/models/usuario/usuario.module';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';


declare var M: any; // Esto es de materialize para enviar alertas a los usuarios

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  // Creeamos el constructor de la clase y iniciamos el servicio de Usuario.
  usuarioServices: UsuariosService;
  constructor( usuarioServices: UsuariosService){
    this.usuarioServices = usuarioServices;
  }
  
  

  ngOnInit(){
    console.log("iniciando");
    this.resetUsuarios();
    //this.getUsuarios();
  }
  
  busqueda: string = ''; // Texto por el que se va a buscar
  criterio: string = ''; // Criterio para elejir la busqueda

  resetUsuarios() {
    this.busqueda = ''; // Reinicia el texto de búsqueda
    this.criterio = ''; // Reinicia el criterio de búsqueda
    this.usuarioServices.usuarios = []; // Limpia la lista de usuarios
  }
  
  buscar() {
    console.log("Buscando " + this.criterio + " que coincida con " + this.busqueda);
    this.checkUserRole('Administrador', () => {
      console.log("El usuario es administrador");
//      M.toast({ html: "El usuario es administrador.", classes: "rounded green" });

      switch (this.criterio) {
        case "TODOS":
          this.getUsuarios(); // Obtener todos los usuarios
          break;
  
        case "Administrador":
          // Validar si el rol es válido
          console.log("Buscar por ROL de admin");
          this.usuarioServices.findByRole(this.criterio).subscribe(resp => {
            this.usuarioServices.usuarios = resp as UsuarioModule[];
//                M.toast({ html: "Buscando por ROL de admin: " + resp , classes: "rounded green" });
            console.log(resp);
          });
          break;
  
        case "Cliente":
          // Validar si el rol es válido
          console.log("Buscar por ROL de user");
          this.usuarioServices.findByRole(this.criterio).subscribe(resp => {
            this.usuarioServices.usuarios = resp as UsuarioModule[];
            console.log(resp);
          });
          break;
    
        default:
          console.log("Criterio no válido");
          M.toast({ html: "Tienes que acreditarte como administrador para ver esta información.", classes: "rounded red" });
          break;
      }
    },
    () => {
      console.log("El usuario no tiene permisos para buscar usuarios.");
      }
    );
    
  }


  findByNombre(nombre: string){
    this.usuarioServices.findByNombre(nombre)
      .subscribe(res =>{
        this.usuarioServices.usuarios = res as UsuarioModule[];
        console.log(res);
      })
  }

  getUsuarios(){
    console.log("obtener Usuarios");
    
    this.usuarioServices.getUsuarios()
      .subscribe(res =>{
        this.usuarioServices.usuarios = res as UsuarioModule[];
        console.log(res);
      })
  }

    
  editUsuario(Usuario: UsuarioModule){
    this.checkUserRole('Administrador',
      () => {
    console.log("Editar Usuario");
    this.usuarioServices.selectedUsuario = Usuario;
      },
      () => {
        console.log("El usuario no tiene permisos para editar el usuario.");
      }
    );
  }

  deleteUsuario(_id: string){
    console.log("Eliminar Usuario");
    this.checkUserRole('Administrador',
      () => {
    this.usuarioServices.deleteUsuario(_id)
      .subscribe(res => {
        console.log(res);
        this.getUsuarios();
        console.log("Usuario eliminado");
        M.toast({html: "Eliminado con exito", classes: "rounded green"});
        
      })
    this.getUsuarios();
      },
      () => {
        console.log("El usuario no tiene permisos para eliminar el usuario.");
      }
    );
  }

  checkUserRole(expectedRole: string, onSuccess: () => void, onError: () => void) {
    this.usuarioServices.findRol(this.busqueda).subscribe({
      next: (res) => {
        const rol = res as UsuarioModule;
        if (rol.role === expectedRole) {
          onSuccess();
        } else {
          console.log(`El usuario no tiene el rol requerido: ${expectedRole}`);
          M.toast({ html: `El usuario necesita ser un ${expectedRole}`, classes: "rounded red" });
          onError();
        }
      },
      error: (err) => {
        console.error("Error al buscar el rol del usuario:", err);
        M.toast({ html: `Por favor, introduzca un ID de ${expectedRole} válido`, classes: "rounded red" });
        onError();
      }
    });
  }

}

