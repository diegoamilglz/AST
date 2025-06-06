import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModule } from 'src/app/models/usuario/usuario.module';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

declare var M: any; // Esto es de materialize para enviar alertas a los usuarios


@Component({
  selector: 'app-insertar-usuario',
  templateUrl: './insertar-usuario.component.html',
  styleUrls: ['./insertar-usuario.component.css'],
  providers: [UsuariosService]
})

export class InsertarUsuarioComponent {


    // Creeamos el constructor de la clase y iniciamos el servicio de usuario.
    usuarioService: UsuariosService;
    constructor( usuarioService: UsuariosService){
      this.usuarioService = usuarioService;
    }

    ngOnInit(){
      console.log("iniciando");
      //this.getUsuarios();
      this.resetForm();
    }

 
  
 
    
    busqueda: string = ''; // TExto por el que se va a buscar
    criterio: string = ''; // Criterio para elejir la busqueda
  
    buscar() {
      console.log("Buscando " + this.criterio + " que coincida con " + this.busqueda);
    
      this.usuarioService.findByID(this.busqueda).subscribe({
        next: (res) => {
          let usuario = res as UsuarioModule;
          this.usuarioService.usuarios = [usuario]; // Actualiza la lista con el usuario encontrado
//          M.toast({ html: "Usuario encontrado "+ this.usuarioService.usuarios[0].nombre, classes: "rounded green" }); // Muestra un mensaje de éxito
          console.log("Usuario encontrado:", res);
        },
        error: (err) => {
          console.error("Error al buscar el usuario:", err);
//        M.toast({ html: "Usuario no encontrado.", classes: "rounded red" }); // Muestra un mensaje de error
          this.usuarioService.usuarios = []; // Limpia la lista de usuarios si no se encuentra ninguno
        }
      });
    }
  

  
    deleteUsuario(_id: string){
      console.log("Eliminar Usuario");
      
      this.usuarioService.deleteUsuario(_id)
        .subscribe(res => {
          console.log(res);
          console.log("Usuario eliminado");
          this.usuarioService.usuarios = [];
          M.toast({html: "Eliminado con exito", classes:"rounded green" });
          this.busqueda = ''; 
        })
      //this.getUsuarios();
    }
  
  // // Definimos la funcion que va a manejar el formulario
  addUsuario(form:NgForm){
    // En caso de que existe el id lo actualizamos 
    if (form.value._id){

    } else{
      // En caso de que no exista el id lo creamos
      console.log(form.value);
      this.usuarioService.postUsuario(form.value).subscribe({
        next: (res: any) => {
            this.getLast(); 
            this.resetForm(form);          
        },
        error: (err) => {
          console.error("Error al guardar el usuario:", err);
//          M.toast({ html: "Error al guardar el usuario.", classes: "rounded red" });
        }
      });
      }
  }

  getLast() {
    console.log("Obteniendo el último usuario creado...");
  
    this.usuarioService.getUsuarios().subscribe({
      next: (res: any) => {
        const usuarios = res as UsuarioModule[];
  
        if (usuarios.length > 0) {
          const ultimoUsuario = usuarios[usuarios.length - 1];
          console.log("Último usuario creado:", ultimoUsuario._id);
  
          M.toast({ html: `Usuario creado: ${ultimoUsuario._id}`, classes: "rounded green" });
        } else {
          console.log("No hay usuarios disponibles.");
          M.toast({ html: "No hay usuarios disponibles.", classes: "rounded red" });
        }
      },
      error: (err) => {
        console.error("Error al obtener los usuarios:", err);
        M.toast({ html: "Error al obtener los usuarios.", classes: "rounded red" });
      }
    });
  }

 

  resetForm(form?:NgForm, n?:Number){
    //n sirve para saber si el resetForm se ha hecho o no desde el propio programa o desde el html
    if (form) {
      form.reset();
      this.usuarioService.selectedUsuario = new UsuarioModule(
        '',
        'Administrador',
        ''
      );
      if (n==1){
        M.toast({html: "Formulario Borrado"});
      }
    }
  }
}
