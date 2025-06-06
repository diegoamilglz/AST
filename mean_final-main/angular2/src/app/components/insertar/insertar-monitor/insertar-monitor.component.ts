import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MonitorModule } from 'src/app/models/monitor/monitor.module';
import { MonitoresService } from 'src/app/services/monitores/monitor.service';
import { UsuarioModule } from 'src/app/models/usuario/usuario.module';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';


declare var M: any; // Esto es de materialize para enviar alertas a los usuarios


@Component({
  selector: 'app-insertar-monitor',
  templateUrl: './insertar-monitor.component.html',
  styleUrls: ['./insertar-monitor.component.css'],
  providers: [MonitoresService]
})

export class InsertarMonitorComponent {


  // Creeamos el constructor de la clase y iniciamos el servicio de monitor.
  monitoresservice: MonitoresService;
  usuariosService: UsuariosService; // Usuario actual
  constructor( monitoresservice: MonitoresService, usuariosService: UsuariosService){
    this.monitoresservice = monitoresservice;
    this.usuariosService = usuariosService;
  }

  ngOnInit(){
    console.log("iniciando");
    //this.getMonitores();
    this.resetForm();
  }
  
  ID_cliente: string = ''; // ID del cliente
  busqueda: string = ''; // TExto por el que se va a buscar
  criterio: string = ''; // Criterio para elejir la busqueda


  buscar(){
    console.log("Buscando " + this.criterio +" que coincida con " + this.busqueda);
    this.checkUserRole(
      "Administrador",
      () => {
      switch (this.criterio) {
        case "TODOS":
          console.log("Buscar todos los monitores");
          this.monitoresservice.getMonitores()
            .subscribe(res => {
              this.monitoresservice.monitores = res as MonitorModule[];
              console.log(res);
            });
          break;
        case "ID":
          this.monitoresservice.findByID(this.busqueda)
            .subscribe({
              next: (res) => {
                let monitor = res as MonitorModule;
                this.monitoresservice.monitores = [monitor]; // Actualiza la lista con el monitor encontrado
                console.log("Monitor encontrado:", res);
              },
              error: (err) => {
                console.error("Error al buscar el monitor:", err);
                this.monitoresservice.monitores = []; // Limpia la lista de monitores si no se encuentra ninguno
              }
            });
          break;
        case "MARCA":
          console.log("Buscar por marca");
          
          this.monitoresservice.findByMarca(this.busqueda)
            .subscribe(res =>{
              this.monitoresservice.monitores = res as MonitorModule[];
              console.log(res);
            })
          break;
        case "MODELO":
          this.monitoresservice.findByModelo(this.busqueda)
            .subscribe(res =>{
              this.monitoresservice.monitores = res as MonitorModule[];
              console.log(res);
            })
          break;
        case "TIPO_PANEL":
          this.monitoresservice.findByTipoPanel(this.busqueda)
            .subscribe(res =>{
              this.monitoresservice.monitores = res as MonitorModule[];
              console.log(res);
            })
          break;
        default:
          break;
      }
    },
      () => {
        console.log("El usuario no tiene permisos para buscar monitores.");
        this.monitoresservice.monitores = [];
      }
    );
  }

  editMonitor(monitor: MonitorModule) {
    console.log("Editar monitor");
    this.checkUserRole(
      "Administrador",
      () => {
        this.monitoresservice.selectedMonitor = monitor;
        console.log("Monitor editando");
      },
      () => {
        console.log("El usuario no tiene permisos para editar el monitor.");
      }
    );
  }

  deleteMonitor(_id: string){
    console.log("Eliminar monitor");
    this.checkUserRole("Administrador",
      () => {
        this.monitoresservice.deleteMonitor(_id)
          .subscribe(res => {
            console.log(res);
            this.getMonitores();
            console.log("Monitor eliminado");
            M.toast({html: "Eliminado con exito", classes: "rounded green"});
            
          })
        this.getMonitores();
      },
      () => {
        console.log("El usuario no tiene permisos para eliminar el monitor.");
      }
    );
  }
  
  // // Definimos la funcion que va a manejar el formulario
  addMonitor(form:NgForm){
    this.checkUserRole(
      "Administrador",
      () => {
    if (form.value.cantidad >= 0){  // En caso de que existe el id lo actualizamos
      if (form.value._id ){
        
          console.log("Editando monitor");
          this.monitoresservice.putMonitor(form.value)

            .subscribe(res =>{
              var res_string = JSON.stringify(res);
              var res_data = JSON.parse(res_string);
              if(res_data.status == -1){
                M.toast({html: 'Error Editing'});
              }else{
                console.log(res);
                this.resetForm(form);
                M.toast({html: "Editado correctamente", classes: "rounded green"});
                this.getMonitores(); //para chefkiss sería comprobar que busqueda hay activa
              }
          })
        
      } else{
        // En caso de que no exista el id lo eliminamos
        console.log(form.value);
        this.monitoresservice.postMonitor(form.value)
        
        // Con subscrive obtenemos la respuesta del servidor.
          .subscribe(res => {
            console.log(res)
            var res_string = JSON.stringify(res);
            var res_data = JSON.parse(res_string);
            if(res_data.status == -1){
              M.toast({html: 'Error de Guardado', classes: 'rounded red'});
            }else{
              this.resetForm(form); // reseteamos el formulario 
              M.toast({html: 'Guardado con éxito', classes: 'rounded green'});
//              this.getMonitores();
            }
          })
        }
    }
    else{
      M.toast({html: "No se puede poner una cantidad negativa", classes: "red rounded"});
    }
  },
      () => {
        console.log("El usuario no tiene permisos para añadir el monitor.");

      }
    );
  }

  getMonitores(){
    console.log("obtener monitores");
    
    this.monitoresservice.getMonitores()
      .subscribe(res =>{
        this.monitoresservice.monitores = res as MonitorModule[];
        console.log(res);
      })
  }
  
  resetForm(form?:NgForm, n?:Number){
    //n sirve para saber si el resetForm se ha hecho o no desde el propio programa o desde el html
    if (form) {
      form.reset();
      this.monitoresservice.selectedMonitor = new MonitorModule();
      if (n==1){
//        M.toast({html: "Formulario Borrado", classes: "rounded"});
      }
    }
  }

  checkUserRole(expectedRole: string, onSuccess: () => void, onError: () => void) {
    this.usuariosService.findRol(this.ID_cliente).subscribe({
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
