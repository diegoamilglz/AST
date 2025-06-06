import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { pathsToSkip } from 'mongoose';
import { PedidoModule } from 'src/app/models/pedido/pedido.module';
import { MonitorModule } from 'src/app/models/monitor/monitor.module';
import { MonitoresService } from '../monitores/monitor.service';
import { UsuarioModule } from 'src/app/models/usuario/usuario.module';


const axios = require('axios');
const uri_pedidos = "http://localhost:3000/pedidos"
//const uri_monitores = "http://localhost:3000/monitores";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  //selectedPedido: PedidoModule;
  //pedidos: PedidoModule[] = [];
  pedidos: PedidoModule[] = [];

  serviceMonitor: MonitoresService;
  selectedPedido: PedidoModule;

  constructor(private http: HttpClient, serviceMonitor: MonitoresService) { 
    this.selectedPedido = new PedidoModule();
    this.serviceMonitor = serviceMonitor;
  } 




  // Nos devolvera un arreglo de empleados que vendran desde nuestro servidor
  getPedidos(){
    return this.http.get(uri_pedidos);
  }
  getPedidosCliente(id_usuario: String){
    // Aqui le pasamos el id del cliente para que nos devuelva solo los pedidos de ese cliente
    return this.http.get(uri_pedidos + `/cliente/${id_usuario}`);
  }

  postPedido(pedido: PedidoModule){
    // al hacer el post tendremos que pasarle la url y el dato que le queremos pasar que en nuestro caso sera el pedido
    return this.http.post(uri_pedidos, pedido);
  }

  putPedido(pedido: PedidoModule){ 
    // put necesita lo mismo pero nosotros en nuestra api rest le tenemos que pasar el id del usuario para que este
    // sepa cual es el que tiene que cambiar y de ahi el  + `/${pedido._id}`
    return this.http.put(uri_pedidos + `/${pedido._id}`, pedido );
  }

  deletePedido(id: String){
    // Aqui lo mismo que antes usamos el metodo delete de http y le mandamos el id del pedido que queremos eliminar
    return this.http.delete(uri_pedidos + `/${id}`);
  }

  // Busca por id
  findByID(id: String){
    return this.http.get(uri_pedidos + `/id/${id}`);
  }

  // Buscar por modelo
  findByIdArticulo(id_articulo: String){
    return this.http.get(uri_pedidos + `/id_articulo/${id_articulo}`); 
  }

  findByIdAndCliente(id: String, id_usuario: String){
    return this.http.get(uri_pedidos + `/clientes/${id}/${id_usuario}`); //cuidaaao
  }

  addPedido(pedido :  PedidoModule){
    return this.http.post(uri_pedidos, pedido);
  }


/* 
 async obtenerGetMonitores(){
    try{
      var response = await axios.get(uri_monitores);
      return response.data;
    }catch(error){
      console.error(error);
      return -1;
    }
  }

  async obtenerDeleteMonitor(id_monitor : string){
    try{
      var response = await axios.delete(uri_monitores + `/${id_monitor}`);
      return response;
      console.log(response.data);
    }catch(error){
      return -1;
      console.error(error);
    }
  }

  async obtenerFindByID(id_monitor : string){
    try{
      var response = await axios.get(uri_monitores + `/${id_monitor}`);
      return response;
    }catch(error){
      console.error(error);
      return -1;
    }
  } //FINDBYID CREO QUE ESTÁ MAL (YA ARREGLADO)

  async obtenerPutMonitor(monitor: MonitorModule){
    try{
      var response = await axios.put(uri_monitores + `/${monitor._id}`, monitor);
      return response;
    }catch(error){
      console.error(error);
      return -1;
    }
  } */


}

