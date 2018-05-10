import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Upload } from './upload';

@Injectable()
export class ContenidosService {

  array = [];

  constructor(private db: AngularFireDatabase) {
  }

  loadList(curso: String, modalidad: String, modulo: String) {
    this.array = [];
    return this.db.list('/' + modalidad + curso + '/' + modulo).valueChanges();
  }

  add(curso: String, modalidad: String, modulo: String, data) {
    return this.db.object('/' + modalidad + curso + '/' + modulo + '/' + data.num).update(data);
  }

}
