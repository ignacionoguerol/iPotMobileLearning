import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../alumnos.service';
import { GestoresService } from '../gestores.service';
import { Alumno } from '../alumno';
import {Gestor} from '../gestor';
import {falseIfMissing} from 'protractor/built/util';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})

export class AlumnosComponent implements OnInit {

  alumnosList: Alumno[];
  nuevoAlumno: boolean;
  modificarAlumno: boolean;
  alumno: Alumno;
  filter: string;
  gestor: Gestor;
  loading: boolean;


  constructor(private alumnosService: AlumnosService, private gestoresService: GestoresService) {
    this.getList();
    this.nuevoAlumno = false;
    this.modificarAlumno = false;
    this.alumno = new Alumno();
    this.filter = '';
    this.loading = false;
    this.getGestorActual();
  }

  ngOnInit() {
  }

  getList() {
    this.alumnosList = this.alumnosService.getList();
  }

  newAlumno() {
    if (this.nuevoAlumno) {
      this.nuevoAlumno = false;
    } else {
      this.nuevoAlumno = true;
      this.modificarAlumno = false;
      this.alumno = new Alumno();
    }
  }

  modifyAlumno(uid: string, name: string, email: string) {
    if (this.modificarAlumno) {
      this.modificarAlumno = false;
      this.alumno = new Alumno();
    } else {
      this.modificarAlumno = true;
      this.alumno.uid = uid;
      this.alumno.Email = email;
      this.alumno.Nombre = name;
    }
  }

  addAlumno() {}

  updateAlumno() {}

  deleteAlumno(uid: string) {}

  getGestorActual() {
    const self = this;
    this.gestoresService.loadGestor().subscribe( g => {
      self.gestor = JSON.parse(JSON.stringify(g));
      console.log(self.gestor);
    });
  }

  isValidMailFormat() {
    const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return EMAIL_REGEXP.test(this.alumno.Email);
  }

}
