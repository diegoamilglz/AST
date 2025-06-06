import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

// Definimos estos tipos para que solo se puedan poner valores de esta manera.

type Tipo_Panel = 'TN'| 'VA'| 'IPS'| 'OLED';

export class MonitorModule { 
  
  _id:            string ;
  marca:          string;
  modelo:         string;
  descripcion:    string;
  frecuencia:     number;
  cantidad:       number;
  precio:         number;
  tipo_panel:     Tipo_Panel;

  
  constructor (
    _id = '', 
    marca= '', 
    modelo='', 
    descripcion= '',
    frecuencia=0,
    cantidad =0, 
    precio =0,
    tipo_panel: Tipo_Panel = 'OLED'
  )
  {
    this._id = _id;
    this.marca = marca;
    this.modelo = modelo;
    this.descripcion = descripcion;
    this.frecuencia= frecuencia;
    this.cantidad =     cantidad  ;
    this.precio =   precio     ;
    this.tipo_panel = tipo_panel;
  }
}



