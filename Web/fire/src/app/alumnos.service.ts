import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Alumno } from './alumno';
import { Observable } from 'rxjs/';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';
import {MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AlumnosService {

  array = [];
  constructor(private db: AngularFireDatabase, private http: HttpClient, public snackBar: MatSnackBar) {
    this.loadList();
  }

  loadList() {
    const self = this;
    self.array = [];
    this.db.list('/usuarios').valueChanges().subscribe(alumnos => {
      self.array.length = 0;
      alumnos.forEach(action => {
        const obj: Alumno = JSON.parse(JSON.stringify(action));
        self.array.push(obj);
      });
    });
    return self.array;
  }

  getList() {
    return this.array;
  }

  addAlumno(email: string, name: string, curso: string) {
    const URL = 'https://us-central1-ipot-mobile-learning.cloudfunctions.net/addAlumno';

    const ob: Observable<HttpResponse> = this.http.get(URL + '?email=' + email + '&name=' + name + '&curso=' + curso);

    return ob;
  }

  modifyAlumno(alumno: Alumno) {
    return this.db.object('usuarios/' + alumno.uid).update(alumno);
  }

  deleteAlumno(uid: string) {
    const URL = 'https://us-central1-ipot-mobile-learning.cloudfunctions.net/deleteAlumno';
    const ob: Observable<HttpResponse> = this.http.get(URL + '?uid=' + uid);

    return ob;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

}
