import { Curso } from './curso';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import generateId from './generateId';

@Injectable()
export class CursosService {

  array;

  constructor(private db: AngularFireDatabase) {
    this.array = [];
    this.loadList();
  }

  loadList() {
    const self = this;
    self.array = [];
    this.db.list('/cursos').valueChanges().subscribe(cursos => {
      self.array.length = 0;
      cursos.forEach(action => {
        const obj: Curso = JSON.parse(JSON.stringify(action));
        self.array.push(obj);
      });
    });
    return self.array;
  }

  getList() {
    return this.array;
  }

  modifyCurso(id: number, name: string, gestor: string, oldGestor: string) {
    const data = {
      nombre: name,
      gestor: gestor
    };
    this.db.object('/cursos/' + id).update(data).then();
    if (gestor !== '') {
      this.db.object('/gestores/' + gestor).update({curso: id}).then();
    }
    if (oldGestor !== '') {
      this.db.object('/gestores/' + oldGestor).update({curso: ''}).then();
    }
  }

  addCurso(name: string, gestor: string) {
    const data = {
      nombre: name,
      gestor: gestor,
      id: generateId(20)
    };
    console.log('id: ' + data.id);
    this.db.object('/cursos/' + data.id).update(data).then();
    this.db.object('/gestores/' + gestor).update({curso: data.id}).then();
  }

  deleteCurso(curso: Curso) {
    this.db.object('cursos/' + curso.id).remove().then();
    this.db.object('gestores/' + curso.gestor).update({curso: ''}).then();
  }

  getCurso (id: String) {
    return this.db.object('cursos/' + id).valueChanges();
  }

}
