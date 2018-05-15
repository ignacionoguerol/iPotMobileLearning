import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule, AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Upload } from './upload';


@Injectable()
export class ContenidosService {

  array = [];
  ref: AngularFireStorageReference;

  constructor(private db: AngularFireDatabase, private af: AngularFireStorage) {
  }

  loadList(curso: String, modalidad: String, modulo: String) {
    this.array = [];
    return this.db.list('/' + modalidad + curso + '/' + modulo).valueChanges();
  }

  add(curso: String, modalidad: String, modulo: String, data) {
    return this.db.object('/' + modalidad + curso + '/' + modulo + '/' + data.num).update(data);
  }

  upload(event, dir) {
    this.ref = this.af.ref(dir);
    return this.ref.put(event.target.files[0]);
  }

  delete(curso: string, modalidad: String, modulo: String, id: String) {
    return this.db.object('/' + modalidad + curso + '/' + modulo + '/' + id).remove();
  }

}
