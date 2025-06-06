import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MonitorModule } from 'src/app/models/monitor/monitor.module';
import { PedidoModule } from 'src/app/models/pedido/pedido.module';
import { MonitoresService } from 'src/app/services/monitores/monitor.service';
import { PedidoService } from 'src/app/services/pedidos/pedido.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { UsuarioModule } from 'src/app/models/usuario/usuario.module';

declare var M: any; // Esto es de materialize para enviar alertas a los usuarios

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})


export class PedidosComponent {

  
  // Creeamos el constructor de la clase y iniciamos el servicio de pedido.
  pedidoService: PedidoService;
  usuarioService: UsuariosService;
  monitoresservice: MonitoresService;

  constructor( pedidoService: PedidoService, usuarioService: UsuariosService, monitoresservice: MonitoresService){
    this.pedidoService = pedidoService;
    this.usuarioService = usuarioService;
    this.monitoresservice = monitoresservice;
  }

  ngOnInit(){
    console.log("iniciando");
    this.pedidoService.pedidos = [];
    //this.getPedidos();
  }

  ID_cliente: string = ''; // ID del cliente
//  ID_bis: string = ''; // ID del cliente
  busqueda: string = ''; // TExto por el que se va a buscar
  criterio: string = ''; // Criterio para elejir la busqueda
  cantidad: number = 0; // Cantidad para realizar el envio
  direccion: string = '' // Direccion a la que se va realizar el envio

  buscar(){
    console.log("Buscando " + this.criterio +" que coincida con " + this.busqueda);
    this.checkUserRole(
      "Cliente",
      () => {
          switch (this.criterio) {
            // case "TODOS": 
            //   this.getPedidos();
            //   break;
            case "TODOS":
              console.log("Buscar todos los pedidos de ESE cliente");
              this.getPedidosCliente(this.ID_cliente);
              break;
            case "ID":
              console.log("Buscar por ID y que sean de ESE cliente");
              this.pedidoService.findByIdAndCliente(this.busqueda, this.ID_cliente)
                .subscribe({
                  next: (res) => {
                    if (res) {
                      this.pedidoService.pedidos = Array.isArray(res) ? res : [res];
                      console.log("Pedidos encontrados:", this.pedidoService.pedidos);
                    } else {
                      this.pedidoService.pedidos = [];
//                      M.toast({ html: "No se encontraron pedidos.", classes: "rounded red" });
                    }
                  },
                  error: (err) => {
                    this.pedidoService.pedidos = [];
                    console.error("Error al buscar el pedido:", err);
//                    M.toast({ html: "Error al buscar el pedido.", classes: "rounded red" });
                  }
                });
              break;
            /* case "ID ARTICULO":
              console.log("Buscar por id del artículo");
              
              this.pedidoService.findByIdArticulo(this.busqueda) //MAL
                .subscribe({
                  next: (res) => {
                    if (Array.isArray(res) && res.length > 0) {
                      this.pedidoService.pedidos = res as PedidoModule[];
                      console.log(res);
                    } else {
                      M.toast({html: "No se encontraron resultados"});
                    }
                  },
                  error: (err) => {
                    this.pedidoService.pedidos = [];
                    console.error("Error al buscar por ID_ARTICULO:", err);
                    M.toast({html: "Error al realizar la búsqueda"});
                    
                  }
                });
              break;
            default:
          break; */
          }//switch
      },  
      () => {
        console.log("El usuario no es cliente");
        this.pedidoService.pedidos = [];
      }
    );
  }

  getPedidos(){
    console.log(this.usuarioService);
    console.log("obtener pedidos");
    
    this.pedidoService.getPedidos()
      .subscribe(res =>{
        this.pedidoService.pedidos = res as PedidoModule[];
        console.log(res);
      })
  }

  getPedidosCliente(ID_cliente : string){
    console.log("obtener pedidos de cliente");
    this.pedidoService.getPedidosCliente(ID_cliente)
      .subscribe(res =>{
        this.pedidoService.pedidos = res as PedidoModule[];
        console.log(res);
      })
  }
  
/*   
  findByIdArticulo(id_articulo: string){
    console.log("Encontrar pedido por id de artículo")

    this.pedidoService.findByIdArticulo(id_articulo)
      .subscribe(res =>{
        this.pedidoService.pedidos = res as PedidoModule[];
        console.log(res);
      })
  }

 */
/*   findById(id: string){
    console.log("Encontrar pedido por id")

    this.pedidoService.findByID(id)
      .subscribe(res =>{
        this.pedidoService.pedidos = res as PedidoModule[];
        console.log(res);
      })
  } */



  //cant: number = 0;
  editPedido(pedido: PedidoModule){
    console.log("Editar pedido");
    this.checkUserRole(
      "Cliente",
      () => {
          this.usuarioService.findRol(this.ID_cliente).subscribe({
            next:(res) => {
              let rol = res as UsuarioModule;
              if(rol.role == "Cliente"){
          //this.cant = pedido.cantidad;
              this.pedidoService.selectedPedido = pedido;
              }
              }
          });
        },
      () => {
        console.log("El usuario no es cliente");
      }
    );
  }

  deletePedido(pedido: PedidoModule){ //(cambiar, hai que actualizar monitores)
    console.log("Eliminar pedido");
    this.checkUserRole(
      "Cliente",
      () => {
          this.monitoresservice.findByID(pedido.id_articulo)
            .subscribe({
              next:(res_m )=> {
              console.log(res_m);
              var monitor = res_m as MonitorModule;
              monitor.cantidad = monitor.cantidad + pedido.cantidad;
              this.monitoresservice.putMonitor(monitor)
                .subscribe({
                  next: (res) => {
                  console.log(res);
                  console.log("Monitor actualizado");
                  this.pedidoService.deletePedido(pedido._id)
                  .subscribe(res => {
                    console.log(res);
                    this.buscar();
                    //this.getPedidos();
                    console.log("Pedido eliminado");
                    M.toast({html: "Eliminado con exito", classes: "rounded green"});
                  })
                },
                error: (err) => {
                  console.log(err);
                  M.toast({html: "Error al eliminar el pedido", classes: "rounded red"});
                }
              })
            },
            error: (err) => {
              console.log(err);
              M.toast({html: "No existe el monitor", classes: "rounded red"});
              this.pedidoService.deletePedido(pedido._id) // para resolver bugged cando non existe o artículo
              .subscribe(res => {
                console.log(res);
                this.buscar();
                //this.getPedidos();
                console.log("Pedido eliminado");
                M.toast({html: "Pedido eliminado", classes: "rounded green"});  
              })
            }
          } );
        },
      () => {
        console.log("El usuario no es cliente");
      }
    );
  }




  resetForm(form?:NgForm, n?:Number){
   //n sirve para saber si el resetForm se ha hecho o no desde el propio programa o desde el html
   if (form) {
     form.reset();
     if (n==1){
       M.toast({html: "Formulario Borrado"});
     }
   }
 }



  addPedido(form: NgForm) {
    if (form.value._id) {
      // Supoño que non cambia de usuario MENTRES se esté editando
      console.log("Editando pedido");
      console.log(form.value);
      // Actualizar el pedido con los nuevos valores
      this.pedidoService.selectedPedido.nombre = form.value.nombre;
      this.pedidoService.selectedPedido.direccion_de_envio = form.value.direccion_de_envio;
      this.pedidoService.selectedPedido.modificado = form.value.modificado;
      
      this.pedidoService.putPedido(this.pedidoService.selectedPedido)
      .subscribe((pedidoRes: any) => {
        if (pedidoRes.status === -1) {
          M.toast({ html: "Error en la edición del pedido", classes: "rounded red" });
        } else {
          console.log("Pedido actualizado:", pedidoRes);
          this.resetForm(form);
          this.buscar();
//          this.getPedidos();
          M.toast({ html: "Edición completada", classes: "rounded green" });
        }
        });
    } else {
      M.toast({ html: "No se puede editar", classes: "rounded red" });
    }
  }

  checkUserRole(expectedRole: string, onSuccess: () => void, onError: () => void) {
    this.usuarioService.findRol(this.ID_cliente).subscribe({
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
