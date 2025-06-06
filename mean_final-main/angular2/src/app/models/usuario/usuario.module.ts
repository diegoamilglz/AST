import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




type Role = 'Administrador'| 'Cliente';

export class UsuarioModule { 
  
  _id:              string;
  role:             Role;
  nombre:           string;
  
  constructor (
    _id = '',
    role: Role = 'Cliente', 
    nombre: ''
  )
  {
    this.nombre = nombre;
    this._id = _id;
    this.role = role;

  }
}
