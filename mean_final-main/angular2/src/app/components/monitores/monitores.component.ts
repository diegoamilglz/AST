import { Component , OnInit } from '@angular/core';
import { UsuarioModule } from 'src/app/models/usuario/usuario.module';

import {  NgForm } from '@angular/forms'; // Necesario para trabajar con formularios
import { json } from 'express';
// import { response } from 'express';

// import { FormGroup, FormControl, Validators } from '@angular/forms';


// Importamos el servicio de monitores para que se pueda usar en el modelo de html
import { MonitoresService } from '../../services/monitores/monitor.service';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { PedidoModule } from 'src/app/models/pedido/pedido.module';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { MonitorModule } from 'src/app/models/monitor/monitor.module';

declare var M: any; // Esto es de materialize para enviar alertas a los usuarios


// Decorador de la clase
@Component({
  selector: 'app-monitores', // Definimos como llamar al componente desde html
  templateUrl: './monitores.component.html', //url a la pagina html del componente
  styleUrls: ['./monitores.component.css'], // url a la pagina de estilos del componente
  providers: [MonitoresService]
  
})


// Exportamos la clase y la definimos
export class MonitoresComponent {
  
  monitorInputs: { [id: string]: { cantidad: number; direccion: string } } = {};

  // Creeamos el constructor de la clase y iniciamos el servicio de monitor.
  monitoresservice: MonitoresService;
  pedidoService: PedidoService;
  usuariosService: UsuariosService; // Usuario actual

  constructor( monitoresservice: MonitoresService, pedidoService: PedidoService, usuariosService: UsuariosService){
    this.monitoresservice = monitoresservice;
    this.pedidoService = pedidoService;
    this.usuariosService = usuariosService;
  }

  ngOnInit(){
    console.log("iniciando");
    //this.getMonitores();
  }

  ID_cliente: string = ''; // ID del cliente
  busqueda: string = ''; // TExto por el que se va a buscar
  criterio: string = ''; // Criterio para elejir la busqueda
  cantidad: number = 0; // Cantidad para realizar el envio
  direccion: string = '' // Direccion a la que se va realizar el envio
  modificado: number = 0; // Modificado para saber si se ha modificado el pedido o no

  buscar(){
    this.checkUserRole('Cliente', () => {
    console.log("El usuario es cliente");
          switch (this.criterio) {
          // case "TODOS": 
          //   this.getMonitores();
          //   break;
          case "TODOS":
            this.getMonitores();
            break;
            case "ID":
              console.log("Buscar por ID");
              this.monitoresservice.findByID(this.busqueda)
                .subscribe({
                  next: (res) => {
                    const monitor = res as MonitorModule;
                    this.monitoresservice.monitores = [monitor];
                    console.log("monitor encontrado");
                    //M.toast({ html: "No se encontró ningún monitor con el ID proporcionado.", classes: "rounded red" });
                    
                  },
                  error: (err) => {
                    console.error("Error al buscar el monitor por ID:", err);
                    this.monitoresservice.monitores = [];
//                    M.toast({ html: "Error al buscar el monitor. Verifica su ID.", classes: "rounded red" });
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
          default:providers: [MonitoresService]
            break;
          }
        },
        () => {
          console.log("El usuario no es cliente");
          this.monitoresservice.monitores = [];
        }
      );
  }

/*   
  findByMarca(marca: string){
    this.monitoresservice.findByMarca(marca)
      .subscribe(res =>{
        this.monitoresservice.monitores = res as MonitorModule[];
        console.log(res);
      })
  } */
  initializeInputs() {
    this.monitoresservice.monitores.forEach(monitor => {
      this.monitorInputs[monitor._id] = { cantidad: 0, direccion: '' };
    });
  }

  getMonitores(){
    console.log("obtener monitores");
    
    this.monitoresservice.getMonitores()
      .subscribe(res =>{
        this.monitoresservice.monitores = res as MonitorModule[];
        this.initializeInputs(); 
        console.log(res);
      })
  }


  addPedido(monitor: MonitorModule) {
    this.checkUserRole('Cliente', () => {
      console.log("El usuario es cliente");
      const inputs = this.monitorInputs[monitor._id];
      if (inputs.cantidad > 0 && inputs.cantidad <= monitor.cantidad && inputs.direccion.trim() !== '') {
        monitor.cantidad = monitor.cantidad - inputs.cantidad;

        this.monitoresservice.putMonitor(monitor).subscribe(res => {
          this.usuariosService.findByID(this.ID_cliente).subscribe(res => {
            const cliente = res as UsuarioModule;
            const fechaActual = new Date();
            fechaActual.setHours(fechaActual.getHours() + 2);
            const pedido = new PedidoModule(
              '',
              cliente._id,
              cliente.nombre,
              monitor._id,
              inputs.cantidad,
              fechaActual,
              inputs.direccion,
              this.modificado
            );
              this.pedidoService.postPedido(pedido).subscribe(res => {
                this.monitorInputs[monitor._id] = { cantidad: 0, direccion: '' };
//                  this.getMonitores();
                this.pedidoService.getPedidos().subscribe(res => {
                  this.pedidoService.pedidos = res as PedidoModule[];
                  if (this.pedidoService.pedidos.length > 0) {
                    const ultimoPedido = this.pedidoService.pedidos[this.pedidoService.pedidos.length - 1];
                    M.toast({ html: "Pedido " + ultimoPedido._id + " realizado con éxito", classes: "rounded green" });
                  }
                });
              });
          });
        });
      } else {
        M.toast({ html: "Cantidad o dirección inválida", classes: "red rounded" });
      }
    },
     () => {
      console.log("El usuario no es cliente");
      
    }
    );
      
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
