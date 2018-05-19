import { Component, OnInit } from '@angular/core';
import { AlumnosService } from '../alumnos.service';
import { GestoresService } from '../gestores.service';
import { Alumno } from '../alumno';
import {Gestor} from '../gestor';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {LoginService} from '../login.service';

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


  constructor(private alumnosService: AlumnosService, private gestoresService: GestoresService,
              public snackBar: MatSnackBar, public dialog: MatDialog, private loginService: LoginService) {
    this.nuevoAlumno = false;
    this.modificarAlumno = false;
    this.getList();
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
      this.getList();
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

  addAlumno() {
    this.loading = true;
    this.alumnosService.addAlumno(this.alumno.Email, this.alumno.Nombre, this.gestor.curso).subscribe(() => {
      this.loginService.resetPassword(this.alumno.Email).then(res => {
        this.openSnackBar('Alumno añadido correctamente!', 'OK');
        this.loading = false;
      });
    });
    this.newAlumno();
  }

  updateAlumno() {
    this.alumnosService.modifyAlumno(this.alumno).then(ret => {
      this.openSnackBar('Alumno modificado correctamente!', 'OK');
    });
    this.modifyAlumno('', '', '');
  }

  deleteAlumno(uid: string) {
    if (uid) {
      const dialog = this.dialog.open(DialogComponent, {
        data: {
          mensaje: '¿Está seguro de que desea eliminar este alumno?',
          accion: 'Confirmar'
        }
      });

      dialog.afterClosed().subscribe(result => {
        if (result) {
          this.loading = true;
          this.alumnosService.deleteAlumno(uid).subscribe(resp => {
            this.openSnackBar('Eliminado con éxito', 'OK');
            this.getList();
            this.loading = false;
          });

        }
      });
    }
  }

  getGestorActual() {
    const self = this;
    this.gestoresService.loadGestor().subscribe( g => {
      self.gestor = JSON.parse(JSON.stringify(g));
    });
  }

  isValidMailFormat() {
    const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return EMAIL_REGEXP.test(this.alumno.Email);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
