import { Injectable } from '@angular/core';

// Tendremos que importar el modulo httpclient para poder hacer el crud con el servidor de mi pagina web
// de tal manera que podamos realizar el CRUD
import { HttpClient} from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MonitorModule } from '../../models/monitor/monitor.module';

@Injectable({
  providedIn: 'root'

})
export class MonitoresService {

  selectedMonitor: MonitorModule;
  monitores: MonitorModule[] = [];


  // instanciamos el httpclient en el constructor de la clase
  constructor(private http: HttpClient) { 
    this.selectedMonitor = new MonitorModule();
  } 
 


  // Uri del http
  uri = "http://localhost:3000/monitores"


  

  // Nos devolvera un arreglo de empleados que vendran desde nuestro servidor
  getMonitores(){
    return this.http.get(this.uri);
  }

  postMonitor(monitor: MonitorModule){

    // al hacer el post tendremos que pasarle la url y el dato que le queremos pasar que en nuestro caso sera el monitor
    return this.http.post(this.uri, monitor);

  }

  putMonitor(monitor: MonitorModule){ 
    // put necesita lo mismo pero nosotros en nuestra api rest le tenemos que pasar el id del monitor para que este
    // sepa cual es el que tiene que cambiar y de ahi el  + `/${monitor._id}`
    return this.http.put(this.uri + `/${monitor._id}`, monitor );
  }

  deleteMonitor(id: String){
    // Aqui lo mismo que antes usamos el metodo delete de http y le mandamos el id del monitor que queremos eliminar
    return this.http.delete(this.uri + `/${id}`);
  }

  // Busca por marca
  findByMarca(marca: String){
    return this.http.get(this.uri + `/marca/${marca}`);
  }

  // Busca por id
  findByID(id: String){
    return this.http.get(this.uri + `/id/${id}`).pipe(
      catchError((error) => {
        console.error("Error al buscar el monitor por ID:", error);
        return throwError(() => new Error("No se pudo encontrar el monitor con el ID proporcionado."));
      })
    );
  }

  // Buscar por modelo
  findByModelo(modelo: String){
    return this.http.get(this.uri + `/modelo/${modelo}`);
  }
  findByTipoPanel(tipo_panel: String){
    return this.http.get(this.uri + `/tipo_panel/${tipo_panel}`);
  }
  
}
