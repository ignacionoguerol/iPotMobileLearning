import { Gestor } from '../gestor';
import { Component, OnInit } from '@angular/core';
import {GestoresService} from '../gestores.service';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.scss']
})
export class GestoresComponent implements OnInit {

  nuevoGestor: boolean;
  modificarGestor: boolean;
  gestoresList: Gestor[];
  name: string;
  email: string;
  password: string;

  constructor(private gestoresService: GestoresService) {
    this.nuevoGestor = false;
    this.modificarGestor = false;
    this.getList();
   }

  newGestor() {
    if (this.nuevoGestor) {
      this.nuevoGestor = false;
    } else {
      this.nuevoGestor = true;
    }
  }

  modifyGestor(name: string) {
    if (this.modificarGestor) {
      this.modificarGestor = false;
      this.name = '';
    } else {
      this.modificarGestor = true;
      this.name = name;
    }
  }

  getList() {
    this.gestoresList = this.gestoresService.getList();
    console.log("GestoresList"); 
    console.log(this.gestoresList);
  }

  addGestor() {
    this.gestoresService.addGestor(this.name, this.email, this.password);
    this.name = '';
    this.email = '';
    this.password = '';
    }
  
  deleteGestor(uid: string) {
    this.gestoresService.deleteGestor(uid);
  }


  ngOnInit() {
  }
}


