import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Alumno} from './alumno';

@Injectable()
export class AlumnosService {

  array = [];
  constructor(private db: AngularFireDatabase) {
    this.loadList();
  }

  loadList() {
    const self = this;
    this.db.list('/usuarios').valueChanges().subscribe(alumnos => {
      self.array.length = 0;
      alumnos.forEach(action => {
        const obj: Alumno = JSON.parse(JSON.stringify(action));
        self.array.push(obj);
      });
    });
  }

  getList() {
    return this.array;
  }

}
